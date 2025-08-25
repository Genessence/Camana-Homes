import { S3Client, PutBucketPolicyCommand, GetBucketLocationCommand, PutPublicAccessBlockCommand } from '@aws-sdk/client-s3';
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

async function setupS3PublicAccess(): Promise<void> {
  console.log('🔧 Setting up S3 bucket for public read access...');
  console.log(`📦 Bucket: ${bucket}`);
  console.log(`🌍 Region: ${region}\n`);

  try {
    // Step 1: Check if bucket exists
    try {
      const locationResult = await s3Client.send(new GetBucketLocationCommand({ Bucket: bucket }));
      console.log(`✅ Bucket exists in region: ${locationResult.LocationConstraint || 'us-east-1'}`);
    } catch (error) {
      console.error('❌ Error checking bucket:', error);
      throw new Error(`Bucket '${bucket}' may not exist or is not accessible`);
    }

    // Step 2: Disable Block Public Access settings
    console.log('🔓 Disabling Block Public Access settings...');
    
    const publicAccessBlockCommand = new PutPublicAccessBlockCommand({
      Bucket: bucket,
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: false,
        IgnorePublicAcls: false,
        BlockPublicPolicy: false,
        RestrictPublicBuckets: false
      }
    });

    await s3Client.send(publicAccessBlockCommand);
    console.log('✅ Block Public Access settings disabled');

    // Wait a moment for the settings to propagate
    console.log('⏳ Waiting for settings to propagate...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 3: Apply bucket policy for public read access
    console.log('📋 Applying bucket policy for public read access...');
    
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

    const policyCommand = new PutBucketPolicyCommand({
      Bucket: bucket,
      Policy: JSON.stringify(bucketPolicy)
    });

    await s3Client.send(policyCommand);

    console.log('✅ Bucket policy applied successfully!');
    console.log('\n📊 Configuration Summary:');
    console.log('  • Block Public Access: ❌ Disabled');
    console.log('  • Public read policy: ✅ Enabled');
    console.log('  • Resource: arn:aws:s3:::' + bucket + '/*');
    console.log('  • Effect: Allow');
    console.log('  • Principal: * (public)');
    console.log('  • Action: s3:GetObject');

    console.log('\n🌐 Your images are now publicly accessible!');
    console.log(`📸 Test URL: https://${bucket}.s3.${region}.amazonaws.com/properties/luxury-penthouse/2200xxs%20%281%29.webp`);
    
    console.log('\n⚠️  Security Note:');
    console.log('  • Only read permissions are granted');
    console.log('  • No write/delete permissions for public users');
    console.log('  • Images are secure and accessible via HTTPS');

  } catch (error) {
    console.error('❌ Error setting up public access:', error);
    if (error instanceof Error && error.message.includes('BlockPublicPolicy')) {
      console.log('\n💡 Manual Setup Required:');
      console.log('  1. Go to AWS S3 Console');
      console.log('  2. Select your bucket: ' + bucket);
      console.log('  3. Go to "Permissions" tab');
      console.log('  4. Click "Edit" on "Block public access"');
      console.log('  5. Uncheck "Block public bucket policies"');
      console.log('  6. Save changes');
      console.log('  7. Run this script again');
    }
    throw error;
  }
}

// Run the setup
setupS3PublicAccess().catch(console.error);


