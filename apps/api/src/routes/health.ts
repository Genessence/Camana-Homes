import { Router } from 'express';
import { healthcheckDb } from '../lib/prisma.js';

export const healthRouter = Router();

healthRouter.get('/health', async (_req, res) => {
  const db = await healthcheckDb();
  res.json({ ok: true, db });
});


