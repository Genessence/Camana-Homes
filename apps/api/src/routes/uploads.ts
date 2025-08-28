import { Router } from 'express';
import multer from 'multer';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from '../lib/s3.js';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

export const uploadsRouter = Router();

uploadsRouter.post('/uploads/image', upload.single('file'), async (req, res) => {
  try {
    const bucket = process.env.S3_BUCKET || '';
    const region = process.env.AWS_REGION || 'us-east-1';
    if (!req.file) return res.status(400).json({ error: 'file required' });

    const originalName = req.file.originalname || 'upload';
    const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const prefix = String(req.query.prefix || 'uploads');
    const key = `${prefix}/${Date.now()}-${safeName}`;

    await s3.send(new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype || 'application/octet-stream',
    }));

    const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
    res.json({ ok: true, url, key });
  } catch (e: any) {
    console.error('Upload failed:', e);
    res.status(500).json({ error: 'upload failed' });
  }
});


