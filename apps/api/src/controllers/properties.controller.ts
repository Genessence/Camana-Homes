import { RequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';

function mapPropertyCard(p: any) {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    price_amount: Number(p.priceAmount),
    price_currency: p.priceCurrency,
    price_per_sqft: p.pricePerSqft ? Number(p.pricePerSqft) : null,
    property_type: p.propertyType,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area_value: p.areaValue,
    area_unit: p.areaUnit,
    location_label: p.locationLabel,
    outdoor_features: p.outdoorFeatures ?? [],
    indoor_features: p.indoorFeatures ?? [],
    view_description: p.viewDescription ?? null,
    year_built: p.yearBuilt ?? null,
    description: p.description ?? '',
    saves_count: p.savesCount,
    completion_date: p.completionDate ?? null,
    payment_options: p.paymentOptions ?? null,
    key_amenities: p.keyAmenities ?? [],
    location_distances: p.locationDistances ?? [],
    developer: p.developer ?? '',
    developer_logo_url: p.developerLogoUrl ?? null,
    has_video: p.hasVideo,
    has_virtual_tour: p.hasVirtualTour,
    views_count: p.viewsCount,
    primary_image_url: p.images?.[0]?.url ?? '',
    image_urls: (p.images || []).map((i: any) => i.url),
    agent: p.agent
      ? {
          id: p.agent.id,
          name: p.agent.name,
          avatar_url: p.agent.avatarUrl ?? '',
          phone_number: p.agent.phoneNumber ?? '',
          email: p.agent.email ?? '',
          agency: p.agent.agency
            ? {
                id: p.agent.agency.id,
                name: p.agent.agency.name,
                logo_url: p.agent.agency.logoUrl ?? '',
              }
            : undefined,
        }
      : null,
  };
}

export const list: RequestHandler = async (req, res) => {
  const page = Math.max(Number(req.query.page ?? 1), 1);
  const limit = Math.min(Math.max(Number(req.query.limit ?? 12), 1), 50);
  const offset = (page - 1) * limit;

  // Build where clause for filters
  const where: any = {};
  
  if (req.query.search) {
    where.OR = [
      { title: { contains: req.query.search as string, mode: 'insensitive' } },
      { description: { contains: req.query.search as string, mode: 'insensitive' } },
      { locationLabel: { contains: req.query.search as string, mode: 'insensitive' } },
    ];
  }
  
  if (req.query.property_type) {
    where.propertyType = req.query.property_type as string;
  }
  
  if (req.query.min_price || req.query.max_price) {
    where.priceAmount = {};
    if (req.query.min_price) where.priceAmount.gte = Number(req.query.min_price);
    if (req.query.max_price) where.priceAmount.lte = Number(req.query.max_price);
  }
  
  if (req.query.min_bedrooms || req.query.max_bedrooms) {
    where.bedrooms = {};
    if (req.query.min_bedrooms) where.bedrooms.gte = Number(req.query.min_bedrooms);
    if (req.query.max_bedrooms) where.bedrooms.lte = Number(req.query.max_bedrooms);
  }

  // Filter by agent id (for Agent Profile active listings)
  if (req.query.agent_id) {
    const agentIdNum = Number(req.query.agent_id);
    if (!Number.isNaN(agentIdNum)) {
      where.agentId = agentIdNum;
    }
  }

  // Build orderBy clause
  let orderBy: any = [{ createdAt: 'desc' }];
  if (req.query.sort_by) {
    const sortField = req.query.sort_by as string;
    const sortOrder = req.query.sort_order === 'desc' ? 'desc' : 'asc';
    
    if (sortField === 'price') orderBy = [{ priceAmount: sortOrder }];
    else if (sortField === 'bedrooms') orderBy = [{ bedrooms: sortOrder }];
    else if (sortField === 'area') orderBy = [{ areaValue: sortOrder }];
    else if (sortField === 'date') orderBy = [{ createdAt: sortOrder }];
    else orderBy = [{ trendingScore: 'desc' }];
  }

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy,
      take: limit,
      skip: offset,
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        agent: { include: { agency: true } },
      },
    }),
    prisma.property.count({ where }),
  ]);

      res.json({
      properties: properties.map(mapPropertyCard),
      pagination: {
        current_page: page,
        limit,
        total_count: total,
        total_pages: Math.ceil(total / limit),
        has_next: page * limit < total,
        has_prev: page > 1,
      },
    });
};

export const trending: RequestHandler = async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit ?? 3), 1), 12);
  const props = await prisma.property.findMany({
    orderBy: [{ trendingScore: 'desc' }, { createdAt: 'desc' }],
    take: limit,
          include: {
        images: { orderBy: { sortOrder: 'asc' } },
        agent: { include: { agency: true } },
      },
  });
  res.json(props.map(mapPropertyCard));
};

export const featured: RequestHandler = async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit ?? 5), 1), 12);
  let props = await prisma.property.findMany({
    where: { isFeatured: true },
    take: limit,
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      agent: { include: { agency: true } },
    },
  });
  if (props.length === 0) {
    props = await prisma.property.findMany({
      orderBy: [{ trendingScore: 'desc' }],
      take: limit,
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        agent: { include: { agency: true } },
      },
    });
  }
  res.json(props.map(mapPropertyCard));
};

export const bySlug: RequestHandler = async (req, res) => {
  const { slug } = req.params;
  const p = await prisma.property.findFirst({
    where: { slug },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      agent: { include: { agency: true } },
    },
  });
  if (!p) return res.status(404).json({ error: 'Property not found' });

  await prisma.property.update({ where: { id: p.id }, data: { viewsCount: { increment: 1 } } });

  const detail = mapPropertyCard(p);
  // attach images array and timestamps for detail page
  res.json({
    ...detail,
    images: (p.images || []).map((i: any) => ({
      url: i.url,
      sort_order: i.sortOrder,
      is_primary: i.isPrimary,
      alt_text: i.altText ?? null,
    })),
    created_at: p.createdAt.toISOString(),
    updated_at: p.updatedAt.toISOString(),
  });
};

export const stats: RequestHandler = async (req, res) => {
  const { slug } = req.params;
  const p = await prisma.property.findFirst({ where: { slug } });
  if (!p) return res.status(404).json({ error: 'Property not found' });
  res.json({
    last_update: p.updatedAt.toISOString(),
    views_count: p.viewsCount,
    saves_count: p.savesCount,
    days_on_market: p.daysOnMarket,
  });
};

export const isSlugAvailable: RequestHandler = async (req, res) => {
  const slug = String(req.query.slug || '').trim();
  if (!slug) return res.status(400).json({ ok: false, error: 'slug required' });
  const exists = await prisma.property.findFirst({ where: { slug } });
  res.json({ ok: !exists });
};

export const create: RequestHandler = async (req, res) => {
  const data = req.body || {};
  if (!data?.slug || !data?.title) return res.status(400).json({ error: 'title and slug required' });
  const exists = await prisma.property.findFirst({ where: { slug: data.slug } });
  if (exists) return res.status(409).json({ error: 'slug exists' });

  const created = await prisma.property.create({
    data: {
      slug: data.slug,
      title: data.title,
      priceAmount: data.priceAmount != null ? Number(data.priceAmount) : 0,
      priceCurrency: data.priceCurrency,
      pricePerSqft: data.pricePerSqft != null ? Number(data.pricePerSqft) : null,
      propertyType: data.propertyType,
      bedrooms: data.bedrooms ?? 0,
      bathrooms: data.bathrooms ?? 0,
      areaValue: data.areaValue ?? 0,
      areaUnit: data.areaUnit,
      locationLabel: data.locationLabel,

      totalStories: data.totalStories ?? null,
      fullBathrooms: data.fullBathrooms ?? null,
      halfBathrooms: data.halfBathrooms ?? null,
      lotSize: data.lotSize ?? null,
      permitNumber: data.permitNumber ?? null,
      dedNumber: data.dedNumber ?? null,
      mlsId: data.mlsId ?? null,

      interiorFeatures: data.interiorFeatures ?? null,
      appliances: data.appliances ?? null,
      floorDescription: data.floorDescription ?? null,
      fireplace: data.fireplace ?? null,
      fireplaceDescription: data.fireplaceDescription ?? null,
      cooling: data.cooling ?? null,
      coolingDescription: data.coolingDescription ?? null,
      heating: data.heating ?? null,
      heatingDescription: data.heatingDescription ?? null,
      basement: data.basement ?? null,

      exteriorFeatures: data.exteriorFeatures ?? null,
      lotFeatures: data.lotFeatures ?? null,
      sewer: data.sewer ?? null,
      patioPorch: data.patioPorch ?? null,

      highSchool: data.highSchool ?? null,
      elementarySchool: data.elementarySchool ?? null,
      taxes: data.taxes ?? null,
      taxFrequency: data.taxFrequency ?? null,
      daysOnMarket: data.daysOnMarket ?? null,
      accessibility: data.accessibility ?? null,
      garage: data.garage ?? null,
      garageSpaces: data.garageSpaces ?? null,
      parking: data.parking ?? null,
      parkingTotal: data.parkingTotal ?? null,
      view: data.view ?? null,
      county: data.county ?? null,
      waterSource: data.waterSource ?? null,
      newConstruction: data.newConstruction ?? null,
      pool: data.pool ?? null,
      poolFeatures: data.poolFeatures ?? null,
      utilities: data.utilities ?? null,

      outdoorFeatures: data.outdoorFeatures ?? null,
      indoorFeatures: data.indoorFeatures ?? null,
      viewDescription: data.viewDescription ?? null,
      yearBuilt: data.yearBuilt ?? null,
      description: data.description ?? null,
      savesCount: 0,
      completionDate: data.completionDate ?? null,
      paymentOptions: data.paymentOptions ?? null,
      keyAmenities: data.keyAmenities ?? null,
      locationDistances: data.locationDistances ?? null,
      developer: data.developer ?? null,
      developerLogoUrl: data.developerLogoUrl ?? null,

      hasVideo: data.hasVideo ?? false,
      hasVirtualTour: data.hasVirtualTour ?? false,
      viewsCount: 0,
      trendingScore: 0,
      isFeatured: data.isFeatured ?? false,

      agentId: data.agentId ?? null,
    },
  });

  if (Array.isArray(data.images) && data.images.length > 0) {
    await prisma.propertyImage.createMany({
      data: data.images.map((i: any) => ({
        propertyId: created.id,
        url: i.url,
        sortOrder: i.sort_order ?? 0,
        isPrimary: !!i.is_primary,
        altText: i.alt_text ?? null,
      })),
    });
  }

  const withRels = await prisma.property.findUnique({ where: { id: created.id }, include: { images: { orderBy: { sortOrder: 'asc' } }, agent: { include: { agency: true } } } });
  res.status(201).json(mapPropertyCard(withRels));
};

