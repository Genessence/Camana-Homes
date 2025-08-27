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
    author_name: a.authorName ?? null,
    author_avatar_url: a.authorAvatarUrl ?? null,
    published_at: a.publishedAt.toISOString(),
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
    excerpt: a.excerpt ?? '',
    body: a.excerpt ?? '',
    image_url: a.imageUrl ?? null,
    category: a.category ?? null,
    author_name: a.authorName ?? null,
    author_avatar_url: a.authorAvatarUrl ?? null,
    published_at: a.publishedAt.toISOString(),
  });
};

export const create: RequestHandler = async (req, res) => {
  const { title, slug, imageUrl, category, excerpt, authorName, authorAvatarUrl } = req.body || {};
  if (!title || !slug || !imageUrl) return res.status(400).json({ error: 'title, slug and imageUrl required' });
  const exists = await prisma.article.findFirst({ where: { slug } });
  if (exists) return res.status(409).json({ error: 'slug exists' });

  const a = await prisma.article.create({
    data: {
      title,
      slug,
      imageUrl,
      category: category || null,
      excerpt: excerpt || null,
      authorName: authorName || null,
      authorAvatarUrl: authorAvatarUrl || null,
    },
  });
  res.status(201).json({ id: a.id, slug: a.slug });
};

export const remove: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  if (!id || Number.isNaN(id)) return res.status(400).json({ error: 'invalid id' });
  await prisma.article.delete({ where: { id } });
  res.json({ ok: true });
};
