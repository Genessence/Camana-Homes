import { Router } from 'express';
import { getSignedUploadUrl, getSignedDownloadUrl } from '../lib/s3.js';

export const s3Router = Router();

s3Router.get('/s3/upload-url', async (req, res) => {
  const key = String(req.query.key || 'uploads/placeholder');
  const contentType = String(req.query.contentType || 'application/octet-stream');
  const isPublic = String(req.query.public || 'true') !== 'false';
  const url = await getSignedUploadUrl(key, contentType, 900, isPublic ? 'public-read' : undefined);
  const publicUrl = isPublic ? `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}` : undefined;
  res.json({ url, key, publicUrl });
});

s3Router.get('/s3/download-url', async (req, res) => {
  const key = String(req.query.key || 'uploads/placeholder');
  const url = await getSignedDownloadUrl(key);
  res.json({ url, key });
});


