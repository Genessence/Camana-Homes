import { RequestHandler } from 'express';
import { prisma } from '../lib/prisma';

export const list: RequestHandler = async (_req, res) => {
  const agents = await prisma.agent.findMany({ include: { agency: true }, orderBy: { name: 'asc' } });
  res.json(agents.map((a) => ({
    id: a.id,
    name: a.name,
    avatar_url: a.avatarUrl ?? null,
    phone_number: a.phoneNumber ?? null,
    email: a.email ?? null,
    agency: a.agency ? { id: a.agency.id, name: a.agency.name, logo_url: a.agency.logoUrl ?? null } : null,
  })));
};

export const create: RequestHandler = async (req, res) => {
  const {
    name,
    avatarUrl,
    phoneNumber,
    email,
    slug,
    licenseNumber,
    location,
    bio,
    instagramUrl,
    linkedinUrl,
    youtubeUrl,
    websiteUrl,
    agencyName,
  } = req.body || {};

  if (!name) return res.status(400).json({ error: 'name required' });
  let agencyId: number | null = null;
  if (agencyName && typeof agencyName === 'string') {
    const existing = await prisma.agency.findFirst({ where: { name: agencyName } });
    if (existing) agencyId = existing.id;
    else {
      const created = await prisma.agency.create({ data: { name: agencyName } });
      agencyId = created.id;
    }
  }

  const agent = await prisma.agent.create({
    data: {
      name,
      avatarUrl: avatarUrl || null,
      phoneNumber: phoneNumber || null,
      email: email || null,
      slug: slug || null,
      licenseNumber: licenseNumber || null,
      location: location || null,
      bio: bio || null,
      instagramUrl: instagramUrl || null,
      linkedinUrl: linkedinUrl || null,
      youtubeUrl: youtubeUrl || null,
      websiteUrl: websiteUrl || null,
      agencyId,
    },
    include: { agency: true },
  });
  res.status(201).json(agent);
};


export const bySlug: RequestHandler = async (req, res) => {
  const { slug } = req.params as { slug?: string };
  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'slug required' });
  }

  // Try direct slug match first
  let agent = await prisma.agent.findFirst({
    where: { slug },
    include: { agency: true },
  });

  // Fallback: match by name when slug is missing in DB (convert hyphens to spaces)
  if (!agent) {
    const nameCandidate = slug.replace(/-/g, ' ').trim();
    agent = await prisma.agent.findFirst({
      where: { name: { equals: nameCandidate, mode: 'insensitive' } },
      include: { agency: true },
    });
  }

  if (!agent) {
    return res.status(404).json({ error: 'agent not found' });
  }

  return res.json({
    id: agent.id,
    name: agent.name,
    slug: agent.slug ?? null,
    avatar_url: agent.avatarUrl ?? null,
    phone_number: agent.phoneNumber ?? null,
    email: agent.email ?? null,
    license_number: agent.licenseNumber ?? null,
    location: agent.location ?? null,
    bio: agent.bio ?? null,
    instagram_url: agent.instagramUrl ?? null,
    linkedin_url: agent.linkedinUrl ?? null,
    youtube_url: agent.youtubeUrl ?? null,
    website_url: agent.websiteUrl ?? null,
    agency: agent.agency
      ? { id: agent.agency.id, name: agent.agency.name, logo_url: agent.agency.logoUrl ?? null }
      : null,
  });
};


