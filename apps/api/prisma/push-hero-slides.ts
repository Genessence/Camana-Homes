import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Preparing to push 5 listings into hero slides...');

  // Pick top 5 properties: featured first, then by trendingScore and createdAt
  const properties = await prisma.property.findMany({
    orderBy: [
      { isFeatured: 'desc' },
      { trendingScore: 'desc' },
      { createdAt: 'desc' }
    ],
    take: 5,
    include: {
      images: { orderBy: { sortOrder: 'asc' } }
    }
  });

  if (properties.length === 0) {
    console.log('No properties found. Nothing to push.');
    return;
  }

  // Clear existing slides to avoid duplicates
  const del = await prisma.heroSlide.deleteMany({});
  console.log(`🧹 Cleared ${del.count} existing hero slides.`);

  const createdSlides = [] as Array<{ id: number; propertyId: number | null; imageUrl: string; sortOrder: number }>; 

  for (let i = 0; i < properties.length; i++) {
    const p = properties[i];
    const primaryImage = p.images.find((img) => img.isPrimary) || p.images[0];
    if (!primaryImage?.url) {
      console.warn(`Skipping property ${p.id} (${p.slug}) - no image available.`);
      continue;
    }

    const slide = await prisma.heroSlide.create({
      data: {
        title: p.title,
        subtitle: p.locationLabel,
        imageUrl: primaryImage.url,
        propertyId: p.id,
        sortOrder: i + 1,
        isActive: true
      }
    });
    createdSlides.push({ id: slide.id, propertyId: slide.propertyId ?? null, imageUrl: slide.imageUrl, sortOrder: slide.sortOrder });
  }

  console.log('✅ Created hero slides:', createdSlides);
  console.log(`✅ Done. Total created: ${createdSlides.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error pushing hero slides:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


