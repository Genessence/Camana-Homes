import { RequestHandler } from 'express';
import { prisma } from '../lib/prisma.js';

export const list: RequestHandler = async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit ?? 12), 1), 50);
  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: 'desc' },
    take: limit,
  });
  res.json(articles.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    image_url: a.imageUrl ?? null,
    category: a.category ?? null,
    excerpt: a.excerpt ?? null,
    created_at: a.publishedAt.toISOString(),
  })));
};

export const bySlug: RequestHandler = async (req, res) => {
  const { slug } = req.params as { slug?: string };
  if (!slug) return res.status(400).json({ error: 'slug required' });
  const a = await prisma.article.findFirst({ where: { slug } });
  if (!a) return res.status(404).json({ error: 'article not found' });
  res.json({
    id: a.id,
    slug: a.slug,
    title: a.title,
    body: a.excerpt ?? '',
    image_url: a.imageUrl ?? null,
    category: a.category ?? null,
    created_at: a.publishedAt.toISOString(),
  });
};
