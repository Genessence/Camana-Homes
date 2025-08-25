import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

// Helper function to get S3 image URLs from all 10 categories
function getS3ImageUrl(propertyId: number, imageIndex: number): string {
  // All 60 images from 10 categories
  const allImages = [
    // Luxury Penthouse (6 images)
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/luxury-penthouse/2200xxs (1).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/luxury-penthouse/2200xxs (2).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/luxury-penthouse/2200xxs (3).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/luxury-penthouse/2200xxs (4).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/luxury-penthouse/2200xxs (5).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/luxury-penthouse/2200xxs.webp',
    
    // Beachfront Villa (6 images)
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/beachfront-villa/2200xxs (1).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/beachfront-villa/2200xxs (2).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/beachfront-villa/2200xxs (3).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/beachfront-villa/2200xxs (4).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/beachfront-villa/2200xxs (6).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/beachfront-villa/2200xxs.webp',
    
    // Modern Apartment (6 images)
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/modern-apartment/2200xxs (1).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/modern-apartment/2200xxs (2).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/modern-apartment/2200xxs (3).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/modern-apartment/2200xxs (4).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/modern-apartment/2200xxs (5).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/modern-apartment/2200xxs.webp',
    
    // Swiss Chalet (6 images)
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/swiss-chalet/2200xxs (1).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/swiss-chalet/2200xxs (2).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/swiss-chalet/2200xxs (3).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/swiss-chalet/2200xxs (4).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/swiss-chalet/2200xxs (6).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/swiss-chalet/2200xxs.webp',
    
    // Malibu Villa (6 images)
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/malibu-villa/2200xxs (1).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/malibu-villa/2200xxs (2).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/malibu-villa/2200xxs (3).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/malibu-villa/2200xxs (4).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/malibu-villa/2200xxs (5).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/malibu-villa/2200xxs.webp',
    
    // Dubai Marina (6 images)
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/dubai-marina/2200xxs (1).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/dubai-marina/2200xxs (2).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/dubai-marina/2200xxs (3).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/dubai-marina/2200xxs (4).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/dubai-marina/2200xxs (6).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/dubai-marina/2200xxs.webp',
    
    // Palm Jumeirah (6 images)
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/palm-jumeirah/2200xxs (1).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/palm-jumeirah/2200xxs (2).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/palm-jumeirah/2200xxs (3).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/palm-jumeirah/2200xxs (4).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/palm-jumeirah/2200xxs (5).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/palm-jumeirah/2200xxs.webp',
    
    // Business Bay (6 images)
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/business-bay/2200xxs (1).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/business-bay/2200xxs (2).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/business-bay/2200xxs (3).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/business-bay/2200xxs (4).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/business-bay/2200xxs (6).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/business-bay/2200xxs.webp',
    
    // Downtown Dubai (6 images)
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/downtown-dubai/2200xxs (1).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/downtown-dubai/2200xxs (2).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/downtown-dubai/2200xxs (3).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/downtown-dubai/2200xxs (4).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/downtown-dubai/2200xxs (5).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/downtown-dubai/2200xxs.webp',
    
    // International Properties (6 images)
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/international-properties/2200xxs (1).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/international-properties/2200xxs (2).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/international-properties/2200xxs (3).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/international-properties/2200xxs (4).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/international-properties/2200xxs (6).webp',
    'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/international-properties/2200xxs.webp'
  ];
  
  // Create a unique image distribution for each property
  // Use modulo to distribute images across all 60 images
  // This ensures each property gets a different set of images
  const startIndex = (propertyId % 10) * 6; // 10 categories, 6 images each
  const imageIndexInSet = imageIndex % 6; // 6 images per property
  const finalIndex = startIndex + imageIndexInSet;
  
  // Ensure we don't go out of bounds
  return allImages[finalIndex % allImages.length];
}

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  console.log('🧹 Clearing existing data...');
  await prisma.propertyImage.deleteMany();
  await prisma.property.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.agency.deleteMany();
  await prisma.heroSlide.deleteMany();
  await prisma.article.deleteMany();

  // Create agencies
  console.log('🏢 Creating agencies...');
  const agency1 = await prisma.agency.create({
    data: {
      name: 'Camana Homes',
      logoUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/agencies/camana-homes-logo.png'
    }
  });

  const agency2 = await prisma.agency.create({
    data: {
      name: 'Luxury Estates Dubai',
      logoUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/agencies/luxury-estates-logo.png'
    }
  });

  // Create agents
  console.log('👨‍💼 Creating agents...');
  const agent1 = await prisma.agent.create({
    data: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@camana-homes.com',
      phoneNumber: '+971-50-123-4567',
      avatarUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/agents/sarah-johnson.jpg',
      agencyId: agency1.id
    }
  });

  const agent2 = await prisma.agent.create({
    data: {
      name: 'Ahmed Al Mansouri',
      email: 'ahmed.almansouri@luxuryestates.ae',
      phoneNumber: '+971-50-987-6543',
      avatarUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/agents/ahmed-almansouri.jpg',
      agencyId: agency2.id
    }
  });

  // Create properties
  console.log('🏠 Creating properties...');
  const properties = [
    {
      title: 'Luxury Penthouse with Marina View',
      slug: 'luxury-penthouse-marina-view',
      priceAmount: 8500000,
      priceCurrency: 'AED',
      pricePerSqft: 2500,
      propertyType: 'sale',
      bedrooms: 4,
      bathrooms: 5,
      areaValue: 3400,
      areaUnit: 'sqft',
      locationLabel: 'Dubai Marina',
      outdoorFeatures: ['Private Pool', 'Garden', 'BBQ Area', 'Parking'],
      indoorFeatures: ['Smart Home System', 'Wine Cellar', 'Home Theater', 'Gym'],
      viewDescription: 'Panoramic marina and city skyline views',
      yearBuilt: 2023,
      description: 'Stunning luxury penthouse with premium finishes and amenities',
      savesCount: 45,
      completionDate: '2023-12-01',
      paymentOptions: 'Cash, Bank Transfer, Mortgage Available',
      keyAmenities: ['Concierge Service', 'Security', 'Fitness Center', 'Spa'],
      locationDistances: [
        { place: 'Dubai Mall', distance: '15 min' },
        { place: 'Airport', distance: '25 min' },
        { place: 'Beach', distance: '5 min' }
      ],
      developer: 'Emaar Properties',
      hasVideo: true,
      hasVirtualTour: true,
      viewsCount: 1250,
      trendingScore: 95,
      agentId: agent1.id
    },
    {
      title: 'Beachfront Villa in Palm Jumeirah',
      slug: 'beachfront-villa-palm-jumeirah',
      priceAmount: 12500000,
      priceCurrency: 'AED',
      pricePerSqft: 3200,
      propertyType: 'sale',
      bedrooms: 6,
      bathrooms: 7,
      areaValue: 5200,
      areaUnit: 'sqft',
      locationLabel: 'Palm Jumeirah',
      outdoorFeatures: ['Private Beach Access', 'Infinity Pool', 'Garden', 'Helipad'],
      indoorFeatures: ['Elevator', 'Wine Cellar', 'Home Office', 'Staff Quarters'],
      viewDescription: 'Direct beach and sea views',
      yearBuilt: 2022,
      description: 'Exclusive beachfront villa with world-class amenities',
      savesCount: 78,
      completionDate: '2022-06-15',
      paymentOptions: 'Cash, Bank Transfer',
      keyAmenities: ['Private Beach Club', 'Security', 'Concierge', 'Valet Parking'],
      locationDistances: [
        { place: 'Dubai Mall', distance: '20 min' },
        { place: 'Airport', distance: '30 min' },
        { place: 'Beach', distance: '0 min' }
      ],
      developer: 'Nakheel Properties',
      hasVideo: true,
      hasVirtualTour: true,
      viewsCount: 2100,
      trendingScore: 98,
      agentId: agent2.id
    },
    {
      title: 'Modern Apartment in Downtown Dubai',
      slug: 'modern-apartment-downtown-dubai',
      priceAmount: 3200000,
      priceCurrency: 'AED',
      pricePerSqft: 1800,
      propertyType: 'sale',
      bedrooms: 2,
      bathrooms: 2,
      areaValue: 1800,
      areaUnit: 'sqft',
      locationLabel: 'Downtown Dubai',
      outdoorFeatures: ['Balcony', 'City Views', 'Shared Pool'],
      indoorFeatures: ['Modern Kitchen', 'Built-in Wardrobes', 'Smart Home Features'],
      viewDescription: 'Burj Khalifa and city skyline views',
      yearBuilt: 2024,
      description: 'Contemporary apartment in the heart of Dubai',
      savesCount: 32,
      completionDate: '2024-03-01',
      paymentOptions: 'Cash, Bank Transfer, Mortgage Available',
      keyAmenities: ['Concierge', 'Security', 'Fitness Center', 'Pool'],
      locationDistances: [
        { place: 'Dubai Mall', distance: '5 min' },
        { place: 'Airport', distance: '20 min' },
        { place: 'Metro', distance: '3 min' }
      ],
      developer: 'Emaar Properties',
      hasVideo: false,
      hasVirtualTour: true,
      viewsCount: 890,
      trendingScore: 87,
      agentId: agent1.id
    },
    {
      title: 'Swiss Chalet Style Villa',
      slug: 'swiss-chalet-style-villa',
      priceAmount: 6800000,
      priceCurrency: 'AED',
      pricePerSqft: 2100,
      propertyType: 'sale',
      bedrooms: 5,
      bathrooms: 4,
      areaValue: 3200,
      areaUnit: 'sqft',
      locationLabel: 'Emirates Hills',
      outdoorFeatures: ['Mountain Views', 'Garden', 'Terrace', 'Fire Pit'],
      indoorFeatures: ['Wooden Interiors', 'Fireplace', 'Wine Cellar', 'Study'],
      viewDescription: 'Mountain and golf course views',
      yearBuilt: 2021,
      description: 'Unique Swiss chalet-inspired villa with rustic charm',
      savesCount: 56,
      completionDate: '2021-09-01',
      paymentOptions: 'Cash, Bank Transfer, Mortgage Available',
      keyAmenities: ['Golf Course Access', 'Security', 'Concierge', 'Parking'],
      locationDistances: [
        { place: 'Dubai Mall', distance: '25 min' },
        { place: 'Airport', distance: '35 min' },
        { place: 'Golf Course', distance: '2 min' }
      ],
      developer: 'Emaar Properties',
      hasVideo: true,
      hasVirtualTour: false,
      viewsCount: 1450,
      trendingScore: 92,
      agentId: agent2.id
    },
    {
      title: 'Malibu Style Beach House',
      slug: 'malibu-style-beach-house',
      priceAmount: 9500000,
      priceCurrency: 'AED',
      pricePerSqft: 2800,
      propertyType: 'sale',
      bedrooms: 5,
      bathrooms: 6,
      areaValue: 3400,
      areaUnit: 'sqft',
      locationLabel: 'Jumeirah Beach',
      outdoorFeatures: ['Private Beach Access', 'Ocean Views', 'Pool', 'Outdoor Kitchen'],
      indoorFeatures: ['Open Floor Plan', 'Chef\'s Kitchen', 'Home Theater', 'Gym'],
      viewDescription: 'Spectacular ocean and sunset views',
      yearBuilt: 2023,
      description: 'California-inspired beach house with luxury amenities',
      savesCount: 67,
      completionDate: '2023-08-01',
      paymentOptions: 'Cash, Bank Transfer',
      keyAmenities: ['Private Beach Club', 'Security', 'Concierge', 'Boat Dock'],
      locationDistances: [
        { place: 'Dubai Mall', distance: '18 min' },
        { place: 'Airport', distance: '28 min' },
        { place: 'Beach', distance: '0 min' }
      ],
      developer: 'Meraas Properties',
      hasVideo: true,
      hasVirtualTour: true,
      viewsCount: 1780,
      trendingScore: 96,
      agentId: agent1.id
    }
  ];

  const createdPropertyIds: number[] = [];
  for (const propertyData of properties) {
    const property = await prisma.property.create({
      data: propertyData
    });

    console.log(`Created property: ${property.title} (ID: ${property.id})`);
    createdPropertyIds.push(property.id);

    // Create 6 images for each property with different S3 URLs
    for (let j = 0; j < 6; j++) {
      await prisma.propertyImage.create({
        data: {
          propertyId: property.id,
          url: getS3ImageUrl(property.id, j),
          altText: `${property.title} - Image ${j + 1}`,
          isPrimary: j === 0,
          sortOrder: j + 1
        }
      });
    }
  }

  // Create hero slides
  console.log('🖼️ Creating hero slides...');
  const heroSlides = [
    {
      title: 'Luxury Living in Dubai',
      subtitle: 'Discover exclusive properties in the most prestigious locations',
      imageUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/dubai-marina/2200xxs (1).webp',
      propertyId: createdPropertyIds[0] || null,
      sortOrder: 1
    },
    {
      title: 'Beachfront Paradise',
      subtitle: 'Your dream home awaits by the sea',
      imageUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/palm-jumeirah/2200xxs (2).webp',
      propertyId: createdPropertyIds[1] || null,
      sortOrder: 2
    },
    {
      title: 'City Center Excellence',
      subtitle: 'Modern apartments in the heart of Dubai',
      imageUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/business-bay/2200xxs (3).webp',
      propertyId: createdPropertyIds[2] || null,
      sortOrder: 3
    }
  ];

  for (const slideData of heroSlides) {
    await prisma.heroSlide.create({
      data: slideData
    });
  }

  // Create articles
  console.log('📰 Creating articles...');
  const articles = [
    {
      title: 'Dubai Real Estate Market Trends 2024',
      slug: 'dubai-real-estate-market-trends-2024',
      excerpt: 'Discover the latest trends shaping Dubai\'s luxury real estate market',
      imageUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/articles/market-trends-2024.jpg',
      authorName: 'Sarah Johnson',
      authorAvatarUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/agents/sarah-johnson.jpg',
      authorBio: 'Senior luxury property analyst focused on GCC markets and prime global cities.',
      authorWebsiteUrl: 'https://camana-homes.com',
      authorInstagramUrl: 'https://instagram.com/sarah.johnson.realtor',
      authorLinkedinUrl: 'https://linkedin.com/in/sarah-johnson',
      authorYoutubeUrl: 'https://youtube.com/@camanahomes',
      category: 'Market Trends'
    },
    {
      title: 'Investment Opportunities in Palm Jumeirah',
      slug: 'investment-opportunities-palm-jumeirah',
      excerpt: 'Why Palm Jumeirah remains a top investment destination',
      imageUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/articles/palm-jumeirah-investment.jpg',
      authorName: 'Tori Latham',
      authorAvatarUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/agents/ahmed-almansouri.jpg',
      authorBio: 'Real estate journalist covering celebrity homes and investment hotspots.',
      authorWebsiteUrl: 'https://camana-homes.com/journal',
      authorInstagramUrl: 'https://instagram.com/camana.homes',
      authorLinkedinUrl: 'https://linkedin.com/company/camana-homes',
      authorYoutubeUrl: 'https://youtube.com/@camanahomes',
      category: 'Investment'
    },
    {
      title: 'City Center Excellence: Living in Downtown Dubai',
      slug: 'city-center-excellence-downtown-dubai',
      excerpt: 'Modern apartments, walkability, and lifestyle amenities around the Burj district.',
      imageUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/hero/city-center-excellence.jpg',
      authorName: 'Camana Editorial',
      authorAvatarUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/agencies/camana-homes-logo.png',
      authorBio: 'Curated insights from the Camana editorial team on global luxury property.',
      authorWebsiteUrl: 'https://camana-homes.com',
      authorInstagramUrl: 'https://instagram.com/camana.homes',
      authorLinkedinUrl: 'https://linkedin.com/company/camana-homes',
      authorYoutubeUrl: 'https://youtube.com/@camanahomes',
      category: 'Lifestyle'
    },
    {
      title: 'Beachfront Living: Palm Jumeirah Villas',
      slug: 'beachfront-living-palm-jumeirah',
      excerpt: 'Why waterfront homes in the Palm remain blue-chip investments.',
      imageUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/palm-jumeirah/2200xxs%20(3).webp',
      authorName: 'Tori Latham',
      authorAvatarUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/agents/ahmed-almansouri.jpg',
      authorBio: 'Real estate journalist covering celebrity homes and investment hotspots.',
      authorWebsiteUrl: 'https://camana-homes.com/journal',
      authorInstagramUrl: 'https://instagram.com/camana.homes',
      authorLinkedinUrl: 'https://linkedin.com/company/camana-homes',
      authorYoutubeUrl: 'https://youtube.com/@camanahomes',
      category: 'Celebrity Homes'
    },
    {
      title: 'Swiss Chalet Aesthetics in the Desert',
      slug: 'swiss-chalet-aesthetics-desert',
      excerpt: 'Alpine-inspired villas are trending across Emirates Hills.',
      imageUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/swiss-chalet/2200xxs%20(1).webp',
      authorName: 'Camana Editorial',
      authorAvatarUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/agencies/camana-homes-logo.png',
      authorBio: 'Curated insights from the Camana editorial team on global luxury property.',
      authorWebsiteUrl: 'https://camana-homes.com',
      authorInstagramUrl: 'https://instagram.com/camana.homes',
      authorLinkedinUrl: 'https://linkedin.com/company/camana-homes',
      authorYoutubeUrl: 'https://youtube.com/@camanahomes',
      category: 'Architecture'
    },
    {
      title: 'Marina Penthouses: Views and Value',
      slug: 'marina-penthouses-views-and-value',
      excerpt: 'Skyline panoramas and premium amenities define the segment.',
      imageUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/dubai-marina/2200xxs%20(2).webp',
      authorName: 'Sarah Johnson',
      authorAvatarUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/agents/sarah-johnson.jpg',
      authorBio: 'Senior luxury property analyst focused on GCC markets and prime global cities.',
      authorWebsiteUrl: 'https://camana-homes.com',
      authorInstagramUrl: 'https://instagram.com/sarah.johnson.realtor',
      authorLinkedinUrl: 'https://linkedin.com/in/sarah-johnson',
      authorYoutubeUrl: 'https://youtube.com/@camanahomes',
      category: 'Homes for Sale'
    },
    {
      title: 'Business Bay: The New Investor Magnet',
      slug: 'business-bay-investor-magnet',
      excerpt: 'Strong rental yields and an evolving skyline attract capital.',
      imageUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/business-bay/2200xxs%20(3).webp',
      authorName: 'Camana Editorial',
      authorAvatarUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/agencies/camana-homes-logo.png',
      authorBio: 'Curated insights from the Camana editorial team on global luxury property.',
      authorWebsiteUrl: 'https://camana-homes.com',
      authorInstagramUrl: 'https://instagram.com/camana.homes',
      authorLinkedinUrl: 'https://linkedin.com/company/camana-homes',
      authorYoutubeUrl: 'https://youtube.com/@camanahomes',
      category: 'Investment'
    },
    {
      title: 'Modern Apartment Amenities that Matter',
      slug: 'modern-apartment-amenities-that-matter',
      excerpt: 'From smart-home features to wellness spaces—what buyers want.',
      imageUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/modern-apartment/2200xxs%20(4).webp',
      authorName: 'Camana Editorial',
      authorAvatarUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/agencies/camana-homes-logo.png',
      authorBio: 'Curated insights from the Camana editorial team on global luxury property.',
      authorWebsiteUrl: 'https://camana-homes.com',
      authorInstagramUrl: 'https://instagram.com/camana.homes',
      authorLinkedinUrl: 'https://linkedin.com/company/camana-homes',
      authorYoutubeUrl: 'https://youtube.com/@camanahomes',
      category: 'Lifestyle'
    },
    {
      title: 'Global Buyers Eye Downtown Dubai',
      slug: 'global-buyers-eye-downtown',
      excerpt: 'International interest grows as trophy assets come to market.',
      imageUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/downtown-dubai/2200xxs%20(3).webp',
      authorName: 'Sarah Johnson',
      authorAvatarUrl: 'https://camana-homes.s3.ap-south-1.amazonaws.com/agents/sarah-johnson.jpg',
      authorBio: 'Senior luxury property analyst focused on GCC markets and prime global cities.',
      authorWebsiteUrl: 'https://camana-homes.com',
      authorInstagramUrl: 'https://instagram.com/sarah.johnson.realtor',
      authorLinkedinUrl: 'https://linkedin.com/in/sarah-johnson',
      authorYoutubeUrl: 'https://youtube.com/@camanahomes',
      category: 'Market Trends'
    }
  ];

  for (const articleData of articles) {
    await prisma.article.create({
      data: articleData
    });
  }

  console.log('✅ Database seeding completed successfully!');
  console.log(`📊 Created ${properties.length} properties with unique images`);
  console.log(`👨‍💼 Created ${2} agents`);
  console.log(`🏢 Created ${2} agencies`);
  console.log(`🖼️ Created ${heroSlides.length} hero slides`);
  console.log(`📰 Created ${articles.length} articles`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
