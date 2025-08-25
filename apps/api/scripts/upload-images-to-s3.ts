import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readdir, readFile, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { createReadStream } from 'fs';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// S3 Configuration
const region = process.env.AWS_REGION || 'ap-south-1';
const bucket = process.env.S3_BUCKET || 'camana-homes';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

console.log('🔑 AWS Configuration:');
console.log(`  Region: ${region}`);
console.log(`  Bucket: ${bucket}`);
console.log(`  Access Key ID: ${accessKeyId ? accessKeyId.substring(0, 8) + '...' : 'Not found'}`);
console.log(`  Secret Key: ${secretAccessKey ? '***' + secretAccessKey.substring(-4) : 'Not found'}`);

const s3Client = new S3Client({ 
  region,
  credentials: {
    accessKeyId: accessKeyId!,
    secretAccessKey: secretAccessKey!
  }
});

// Image categories mapping
const IMAGE_CATEGORIES = {
  '1': 'luxury-penthouse',
  '2': 'beachfront-villa', 
  '3': 'modern-apartment',
  '4': 'swiss-chalet',
  '5': 'malibu-villa',
  '6': 'dubai-marina',
  '7': 'palm-jumeirah',
  '8': 'business-bay',
  '9': 'downtown-dubai',
  '10': 'international-properties'
};

interface ImageUploadResult {
  localPath: string;
  s3Key: string;
  s3Url: string;
  category: string;
  size: number;
  uploaded: boolean;
  error?: string;
}

async function uploadImageToS3(
  localPath: string, 
  s3Key: string, 
  category: string
): Promise<ImageUploadResult> {
  try {
    const fileBuffer = await readFile(localPath);
    const stats = await stat(localPath);
    
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: s3Key,
      Body: fileBuffer,
      ContentType: 'image/webp',
      Metadata: {
        category,
        originalName: basename(localPath),
        uploadedAt: new Date().toISOString()
      }
    });

    await s3Client.send(command);

    return {
      localPath,
      s3Key,
      s3Url: `https://${bucket}.s3.${region}.amazonaws.com/${s3Key}`,
      category,
      size: stats.size,
      uploaded: true
    };
  } catch (error) {
    return {
      localPath,
      s3Key,
      s3Url: '',
      category,
      size: 0,
      uploaded: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

async function scanAndUploadImages(): Promise<void> {
  console.log('🚀 Starting S3 image upload process...');
  
  // Navigate to project root (two levels up from apps/api)
  const projectRoot = join(process.cwd(), '../..');
  const imgRootPath = join(projectRoot, 'img');
  
  console.log(`📁 Source: ${imgRootPath}`);
  console.log(`☁️  Destination: s3://${bucket}`);
  console.log(`🌍 Region: ${region}\n`);
  const results: ImageUploadResult[] = [];
  let totalImages = 0;
  let uploadedImages = 0;
  let failedImages = 0;

  try {
    // Scan all numbered folders
    for (const folderName of Object.keys(IMAGE_CATEGORIES)) {
      const folderPath = join(imgRootPath, folderName);
      const category = IMAGE_CATEGORIES[folderName as keyof typeof IMAGE_CATEGORIES];
      
      try {
        const files = await readdir(folderPath);
        const imageFiles = files.filter(file => 
          extname(file).toLowerCase() === '.webp'
        );

        console.log(`📂 Processing folder ${folderName} (${category}): ${imageFiles.length} images`);

        for (const imageFile of imageFiles) {
          totalImages++;
          const localPath = join(folderPath, imageFile);
          const s3Key = `properties/${category}/${basename(imageFile, '.webp')}.webp`;
          
          console.log(`  📤 Uploading: ${imageFile} → ${s3Key}`);
          
          const result = await uploadImageToS3(localPath, s3Key, category);
          results.push(result);
          
          if (result.uploaded) {
            uploadedImages++;
            console.log(`    ✅ Success: ${result.s3Url}`);
          } else {
            failedImages++;
            console.log(`    ❌ Failed: ${result.error}`);
          }
        }
      } catch (error) {
        console.error(`❌ Error processing folder ${folderName}:`, error);
      }
    }

    // Generate results summary
    console.log('\n📊 Upload Summary:');
    console.log(`  Total Images: ${totalImages}`);
    console.log(`  Successfully Uploaded: ${uploadedImages}`);
    console.log(`  Failed: ${failedImages}`);
    console.log(`  Success Rate: ${((uploadedImages / totalImages) * 100).toFixed(1)}%`);

    // Generate S3 URL mapping for seed script
    const successfulUploads = results.filter(r => r.uploaded);
    const s3UrlMapping: Record<string, string[]> = {};
    
    successfulUploads.forEach(result => {
      if (!s3UrlMapping[result.category]) {
        s3UrlMapping[result.category] = [];
      }
      s3UrlMapping[result.category].push(result.s3Url);
    });

    // Save mapping to file for seed script
    const mappingPath = join(projectRoot, 'apps/api/scripts/s3-image-mapping.json');
    const fs = await import('fs');
    fs.writeFileSync(mappingPath, JSON.stringify(s3UrlMapping, null, 2));
    
    console.log(`\n📝 S3 URL mapping saved to: ${mappingPath}`);
    console.log('🎯 You can now use these S3 URLs in your seed script!');

  } catch (error) {
    console.error('❌ Fatal error during upload process:', error);
    process.exit(1);
  }
}

// Run the upload process
scanAndUploadImages().catch(console.error);

export { uploadImageToS3, scanAndUploadImages };
