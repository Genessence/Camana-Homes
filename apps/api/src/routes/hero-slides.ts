import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

export const heroSlidesRouter = Router();

// Get all hero slides
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

// Get all hero slides (including inactive ones) for admin
heroSlidesRouter.get('/hero-slides/admin', async (req, res) => {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
      include: {
        property: {
          select: {
            id: true,
            slug: true,
            title: true,
          }
        },
      },
    });

    res.json(slides);
  } catch (error) {
    console.error('Error fetching hero slides for admin:', error);
    res.status(500).json({ error: 'Failed to fetch hero slides' });
  }
});

// Create a new hero slide
heroSlidesRouter.post('/hero-slides', async (req, res) => {
  try {
    const { propertyId, title, subtitle, sortOrder = 0, imageUrl } = req.body;
    
    if (!propertyId) {
      return res.status(400).json({ error: 'Property ID is required' });
    }

    // Check if property exists with images
    const property = await prisma.property.findUnique({
      where: { id: Number(propertyId) },
      include: {
        images: { 
          orderBy: { sortOrder: 'asc' },
          take: 1 
        }
      }
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Get the highest sort order and add 1
    const maxSortOrder = await prisma.heroSlide.aggregate({
      _max: { sortOrder: true }
    });
    
    const newSortOrder = sortOrder || (maxSortOrder._max.sortOrder || 0) + 1;

    // Get the primary image URL or first available image
    const primaryImageUrl = imageUrl || 
      property.images.find(img => img.isPrimary)?.url || 
      property.images[0]?.url || 
      '';

    if (!primaryImageUrl) {
      return res.status(400).json({ error: 'Property must have at least one image to be added to hero slides' });
    }

    // Check if property is already in hero slides
    const existingSlide = await prisma.heroSlide.findFirst({
      where: { propertyId: Number(propertyId) }
    });

    if (existingSlide) {
      return res.status(409).json({ error: 'Property is already in hero slides' });
    }

    const slide = await prisma.heroSlide.create({
      data: {
        propertyId: Number(propertyId),
        title: title || property.title,
        subtitle: subtitle || `Featured ${property.propertyType} in ${property.locationLabel}`,
        sortOrder: newSortOrder,
        imageUrl: primaryImageUrl,
        isActive: true,
      },
      include: {
        property: {
          select: {
            id: true,
            slug: true,
            title: true,
          }
        },
      },
    });

    res.status(201).json(slide);
  } catch (error) {
    console.error('Error creating hero slide:', error);
    res.status(500).json({ error: 'Failed to create hero slide' });
  }
});

// Update a hero slide
heroSlidesRouter.put('/hero-slides/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, sortOrder, isActive, imageUrl } = req.body;

    const slide = await prisma.heroSlide.update({
      where: { id: Number(id) },
      data: {
        title,
        subtitle,
        sortOrder: sortOrder ? Number(sortOrder) : undefined,
        isActive: isActive !== undefined ? Boolean(isActive) : undefined,
        imageUrl,
      },
      include: {
        property: {
          select: {
            id: true,
            slug: true,
            title: true,
          }
        },
      },
    });

    res.json(slide);
  } catch (error) {
    console.error('Error updating hero slide:', error);
    res.status(500).json({ error: 'Failed to update hero slide' });
  }
});

// Delete a hero slide
heroSlidesRouter.delete('/hero-slides/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.heroSlide.delete({
      where: { id: Number(id) }
    });

    res.json({ ok: true, message: 'Hero slide deleted successfully' });
  } catch (error) {
    console.error('Error deleting hero slide:', error);
    res.status(500).json({ error: 'Failed to delete hero slide' });
  }
});

// Reorder hero slides
heroSlidesRouter.post('/hero-slides/reorder', async (req, res) => {
  try {
    const { slides } = req.body; // Array of { id, sortOrder }
    
    if (!Array.isArray(slides)) {
      return res.status(400).json({ error: 'Slides array is required' });
    }

    // Update all slides with new sort orders
    const updates = slides.map(({ id, sortOrder }) =>
      prisma.heroSlide.update({
        where: { id: Number(id) },
        data: { sortOrder: Number(sortOrder) }
      })
    );

    await prisma.$transaction(updates);

    res.json({ ok: true, message: 'Hero slides reordered successfully' });
  } catch (error) {
    console.error('Error reordering hero slides:', error);
    res.status(500).json({ error: 'Failed to reorder hero slides' });
  }
});
