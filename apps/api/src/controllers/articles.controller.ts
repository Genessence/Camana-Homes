import { RequestHandler } from 'express';
import { prisma } from '../lib/prisma.js';

export const list: RequestHandler = async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit ?? 12), 1), 50);
  const articles = await prisma.article.findMany({ orderBy: { publishedAt: 'desc' }, take: limit });
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
    featured_property_id: (a as any).featuredPropertyId ?? null,
  })));
};

export const bySlug: RequestHandler = async (req, res) => {
  const { slug } = req.params as { slug?: string };
  if (!slug) return res.status(400).json({ error: 'slug required' });
  const a = await prisma.article.findFirst({ where: { slug } });
  if (!a) return res.status(404).json({ error: 'article not found' });
  let featured_property: any = null;
  const fpId = (a as any).featuredPropertyId as number | undefined;
  if (fpId) {
    const p = await prisma.property.findUnique({ where: { id: fpId }, include: { images: { orderBy: { sortOrder: 'asc' } } } });
    if (p) featured_property = {
      id: p.id,
      slug: p.slug,
      title: p.title,
      primary_image_url: p.images?.[0]?.url ?? '',
      price_amount: Number(p.priceAmount),
      price_currency: p.priceCurrency,
      property_type: p.propertyType,
      location_label: p.locationLabel,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      area_value: p.areaValue,
      area_unit: p.areaUnit,
    };
  }
  const aAny: any = a as any;
  res.json({
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt ?? '', // short summary (plain text preferred)
    body: aAny.body ?? '',       // full HTML body
    image_url: a.imageUrl ?? null,
    category: a.category ?? null,
    author_name: a.authorName ?? null,
    author_avatar_url: a.authorAvatarUrl ?? null,
    published_at: a.publishedAt.toISOString(),
    featured_property,
  });
};

export const create: RequestHandler = async (req, res) => {
  const { title, slug, imageUrl, category, excerpt, body, authorName, authorAvatarUrl, authorBio, featuredPropertyId } = req.body || {};
  if (!title || !slug || !imageUrl) return res.status(400).json({ error: 'title, slug and imageUrl required' });
  const exists = await prisma.article.findFirst({ where: { slug } });
  if (exists) return res.status(409).json({ error: 'slug exists' });

  const createData: any = {
      title,
      slug,
      imageUrl,
      category: category || null,
      excerpt: excerpt || null,
      body: body || null,
      authorName: authorName || null,
      authorAvatarUrl: authorAvatarUrl || null,
      authorBio: authorBio || null,
      featuredPropertyId: featuredPropertyId || null,
  };
  const a = await prisma.article.create({ data: createData });
  res.status(201).json({ id: a.id, slug: a.slug });
};

export const remove: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  if (!id || Number.isNaN(id)) return res.status(400).json({ error: 'invalid id' });
  await prisma.article.delete({ where: { id } });
  res.json({ ok: true });
};
