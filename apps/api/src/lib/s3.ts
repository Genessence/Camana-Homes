import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const region = process.env.AWS_REGION || 'us-east-1';
const bucket = process.env.S3_BUCKET || '';

export const s3 = new S3Client({ region });

export async function getSignedUploadUrl(key: string, contentType: string, expiresInSeconds = 900) {
  const cmd = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType });
  return getSignedUrl(s3, cmd, { expiresIn: expiresInSeconds });
}

export async function getSignedDownloadUrl(key: string, expiresInSeconds = 900) {
  const cmd = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(s3, cmd, { expiresIn: expiresInSeconds });
}


