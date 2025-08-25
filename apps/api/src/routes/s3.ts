import { Router } from 'express';
import { getSignedUploadUrl, getSignedDownloadUrl } from '../lib/s3';

export const s3Router = Router();

s3Router.get('/s3/upload-url', async (req, res) => {
  const key = String(req.query.key || 'uploads/placeholder');
  const contentType = String(req.query.contentType || 'application/octet-stream');
  const url = await getSignedUploadUrl(key, contentType);
  res.json({ url, key });
});

s3Router.get('/s3/download-url', async (req, res) => {
  const key = String(req.query.key || 'uploads/placeholder');
  const url = await getSignedDownloadUrl(key);
  res.json({ url, key });
});


