import { RequestHandler } from 'express';
import { prisma } from '../lib/prisma';

export const trackView: RequestHandler = async (req, res) => {
  // Safely read body regardless of parsing issues
  let body: any = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = undefined; }
  }
  const property_slug = body?.property_slug || (req.query.property_slug as string | undefined) || (req.params.slug as string | undefined);
  const visitorId = (req.headers['x-visitor-id'] as string) || 'anonymous';

  if (!property_slug) {
    return res.status(400).json({ error: 'property_slug is required' });
  }

  try {
    const property = await prisma.property.findFirst({ where: { slug: property_slug } });
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Upsert recently viewed entry
    await prisma.recentlyViewed.upsert({
      where: {
        uq_recently_viewed_visitor_property: {
          visitorId,
          propertyId: property.id,
        },
      },
      update: {
        viewedAt: new Date(),
      },
      create: {
        visitorId,
        propertyId: property.id,
        viewedAt: new Date(),
      },
    });

    res.json({ ok: true });
  } catch (error) {
    console.error('Error tracking view:', error);
    res.status(500).json({ error: 'Failed to track view' });
  }
};

export const recentlyViewed: RequestHandler = async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit ?? 3), 1), 20);
  const visitorId = req.headers['x-visitor-id'] as string || 'anonymous';

  try {
    const entries = await prisma.recentlyViewed.findMany({
      where: { visitorId },
      orderBy: { viewedAt: 'desc' },
      take: limit,
      include: {
        property: {
          include: {
            images: { orderBy: { sortOrder: 'asc' } },
            agent: { include: { agency: true } },
          },
        },
      },
    });

    const result = entries.map(entry => ({
      property: {
        id: entry.property.id,
        slug: entry.property.slug,
        title: entry.property.title,
        price_amount: Number(entry.property.priceAmount),
        price_currency: entry.property.priceCurrency,
        price_per_sqft: entry.property.pricePerSqft ? Number(entry.property.pricePerSqft) : null,
        property_type: entry.property.propertyType,
        bedrooms: entry.property.bedrooms,
        bathrooms: entry.property.bathrooms,
        area_value: entry.property.areaValue,
        area_unit: entry.property.areaUnit,
        location_label: entry.property.locationLabel,
        outdoor_features: entry.property.outdoorFeatures ?? [],
        indoor_features: entry.property.indoorFeatures ?? [],
        view_description: entry.property.viewDescription ?? null,
        year_built: entry.property.yearBuilt ?? null,
        description: entry.property.description ?? '',
        saves_count: entry.property.savesCount,
        completion_date: entry.property.completionDate ?? null,
        payment_options: entry.property.paymentOptions ?? null,
        key_amenities: entry.property.keyAmenities ?? [],
        location_distances: entry.property.locationDistances ?? [],
        developer: entry.property.developer ?? '',
        developer_logo_url: (entry as any).property.developerLogoUrl ?? null,
        has_video: entry.property.hasVideo,
        has_virtual_tour: entry.property.hasVirtualTour,
        views_count: entry.property.viewsCount,
        primary_image_url: entry.property.images?.[0]?.url ?? '',
        image_urls: entry.property.images.map(i => i.url),
        agent: entry.property.agent
          ? {
              id: entry.property.agent.id,
              name: entry.property.agent.name,
              avatar_url: entry.property.agent.avatarUrl ?? '',
              phone_number: entry.property.agent.phoneNumber ?? '',
              email: entry.property.agent.email ?? '',
              agency: entry.property.agent.agency
                ? {
                    id: entry.property.agent.agency.id,
                    name: entry.property.agent.agency.name,
                    logo_url: entry.property.agent.agency.logoUrl ?? '',
                  }
                : undefined,
            }
          : null,
      },
      viewed_at: entry.viewedAt.toISOString(),
    }));

    res.json(result);
  } catch (error) {
    console.error('Error fetching recently viewed:', error);
    res.status(500).json({ error: 'Failed to fetch recently viewed' });
  }
};
