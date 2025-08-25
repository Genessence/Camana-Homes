import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

export const heroSlidesRouter = Router();

heroSlidesRouter.get('/hero-slides', async (req, res) => {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
      include: {
        property: {
          include: {
            images: { orderBy: { sortOrder: 'asc' } },
            agent: { include: { agency: true } },
          },
        },
      },
    });

    const result = slides.map(slide => {
      let propertyData = null;
      if (slide.property) {
        const p = slide.property;
        propertyData = {
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
          has_video: p.hasVideo,
          has_virtual_tour: p.hasVirtualTour,
          views_count: p.viewsCount,
          primary_image_url: p.images?.[0]?.url ?? '',
          image_urls: p.images.map(i => i.url),
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

      return {
        id: slide.id,
        image_url: slide.imageUrl,
        title: slide.title,
        subtitle: slide.subtitle,
        property_id: slide.propertyId,
        sort_order: slide.sortOrder,
        is_active: slide.isActive,
        property: propertyData,
      };
    });

    res.json(result);
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    res.status(500).json({ error: 'Failed to fetch hero slides' });
  }
});
