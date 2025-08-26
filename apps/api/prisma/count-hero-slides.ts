import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const slides = await prisma.heroSlide.findMany({ orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }] });
  console.log('Hero slides count:', slides.length);
  console.log(slides.map(s => ({ id: s.id, propertyId: s.propertyId, sortOrder: s.sortOrder, imageUrl: s.imageUrl.slice(0, 60) + '...' })));
}

main().finally(async () => {
  await prisma.$disconnect();
});


