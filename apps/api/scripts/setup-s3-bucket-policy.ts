import { S3Client, PutBucketPolicyCommand, GetBucketLocationCommand } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// S3 Configuration
const region = process.env.AWS_REGION || 'ap-south-1';
const bucket = process.env.S3_BUCKET || 'camana-homes';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({ 
  region,
  credentials: {
    accessKeyId: accessKeyId!,
    secretAccessKey: secretAccessKey!
  }
});

async function setupBucketPolicy(): Promise<void> {
  console.log('🔧 Setting up S3 bucket policy for public read access...');
  console.log(`📦 Bucket: ${bucket}`);
  console.log(`🌍 Region: ${region}\n`);

  try {
    // First check if bucket exists and get its location
    try {
      const locationResult = await s3Client.send(new GetBucketLocationCommand({ Bucket: bucket }));
      console.log(`✅ Bucket exists in region: ${locationResult.LocationConstraint || 'us-east-1'}`);
    } catch (error) {
      console.error('❌ Error checking bucket:', error);
      throw new Error(`Bucket '${bucket}' may not exist or is not accessible`);
    }

    // Define the bucket policy for public read access
    const bucketPolicy = {
      Version: "2012-10-17",
      Statement: [
        {
          Sid: "PublicReadGetObject",
          Effect: "Allow",
          Principal: "*",
          Action: [
            "s3:GetObject"
          ],
          Resource: [
            `arn:aws:s3:::${bucket}/*`
          ]
        }
      ]
    };

    console.log('📋 Applying bucket policy for public read access...');
    
    const command = new PutBucketPolicyCommand({
      Bucket: bucket,
      Policy: JSON.stringify(bucketPolicy)
    });

    await s3Client.send(command);

    console.log('✅ Bucket policy applied successfully!');
    console.log('\n📊 Policy Details:');
    console.log('  • Public read access: ✅ Enabled');
    console.log('  • Resource: arn:aws:s3:::' + bucket + '/*');
    console.log('  • Effect: Allow');
    console.log('  • Principal: * (public)');
    console.log('  • Action: s3:GetObject');

    console.log('\n🌐 Your images are now publicly accessible!');
    console.log(`📸 Example URL: https://${bucket}.s3.${region}.amazonaws.com/properties/luxury-penthouse/2200xxs%20%281%29.webp`);
    
    console.log('\n⚠️  Security Note:');
    console.log('  • Only GetObject permission is granted (read-only)');
    console.log('  • Images are public but secure');
    console.log('  • No write/delete permissions for public users');

  } catch (error) {
    console.error('❌ Error setting up bucket policy:', error);
    throw error;
  }
}

// Run the setup
setupBucketPolicy().catch(console.error);


