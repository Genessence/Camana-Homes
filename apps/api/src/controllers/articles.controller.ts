import { RequestHandler } from 'express';
import { prisma } from '../lib/prisma';
import { getSignedDownloadUrl } from '../lib/s3';

async function toAccessibleUrl(imageUrl?: string | null): Promise<string | null> {
  if (!imageUrl) return null;
  try {
    if (!/^https?:\/\//i.test(imageUrl)) {
      return await getSignedDownloadUrl(imageUrl);
    }
    const url = new URL(imageUrl);
    const host = url.hostname.toLowerCase();
    if (host.includes('amazonaws.com')) {
      const path = url.pathname.replace(/^\/+/, '');
      const segments = path.split('/');
      let key = path;
      if (host.startsWith('s3.') || host === 's3.amazonaws.com') {
        key = segments.slice(1).join('/') || '';
      }
      if (key) return await getSignedDownloadUrl(key);
    }
    return imageUrl;
  } catch {
    return imageUrl ?? null;
  }
}

async function mapArticleCard(a: any) {
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt ?? null,
    image_url: (await toAccessibleUrl(a.imageUrl)) ?? a.imageUrl,
    category: a.category ?? null,
    author_name: a.authorName ?? null,
    author_avatar_url: (await toAccessibleUrl(a.authorAvatarUrl)) ?? a.authorAvatarUrl ?? null,
    published_at: a.publishedAt.toISOString(),
  };
}

export const list: RequestHandler = async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit ?? 3), 1), 50);
  const category = req.query.category as string | undefined;

  const where = category ? { category } : {};
  const articles = await prisma.article.findMany({
    where,
    orderBy: { publishedAt: 'desc' },
    take: limit,
  });

  const cards = await Promise.all(articles.map((a) => mapArticleCard(a)));
  res.json(cards);
};

export const bySlug: RequestHandler = async (req, res) => {
  const { slug } = req.params;
  const article = await prisma.article.findFirst({ where: { slug } });
  
  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }

  const base = await mapArticleCard(article);
  res.json({
    ...base,
    author_bio: article.authorBio ?? null,
    author_website_url: article.authorWebsiteUrl ?? null,
    author_instagram_url: article.authorInstagramUrl ?? null,
    author_linkedin_url: article.authorLinkedinUrl ?? null,
    author_youtube_url: article.authorYoutubeUrl ?? null,
  });
};
