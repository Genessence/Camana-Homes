import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing property-related data...');

  // Delete in dependency-safe order (children first)
  const heroSlides = await prisma.heroSlide.deleteMany({});
  const recentlyViewed = await prisma.recentlyViewed.deleteMany({});
  const tourRequests = await prisma.tourRequest.deleteMany({});
  const mortgageForProps = await prisma.mortgageInquiry.deleteMany({ where: { propertyId: { not: null } } });
  const propertyImages = await prisma.propertyImage.deleteMany({});
  const properties = await prisma.property.deleteMany({});

  console.log('Deleted counts:', {
    heroSlides: heroSlides.count,
    recentlyViewed: recentlyViewed.count,
    tourRequests: tourRequests.count,
    mortgageForProps: mortgageForProps.count,
    propertyImages: propertyImages.count,
    properties: properties.count,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


