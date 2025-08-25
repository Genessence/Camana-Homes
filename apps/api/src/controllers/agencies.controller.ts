import { RequestHandler } from 'express';
import { prisma } from '../lib/prisma';

export const list: RequestHandler = async (_req, res) => {
  const agencies = await prisma.agency.findMany({ orderBy: { name: 'asc' } });
  res.json(agencies.map((a) => ({ id: a.id, name: a.name, logo_url: a.logoUrl ?? null })));
};



