import { readdir, readFile, writeFile } from 'fs/promises';
import { join, extname, basename } from 'path';

// Image categories mapping
const IMAGE_CATEGORIES = {
  '1': 'luxury-penthouse',
  '2': 'beachfront-villa', 
  '3': 'modern-apartment',
  '4': 'swiss-chalet',
  '5': 'malibu-villa',
  '6': 'dubai-marina',
  '7': 'palm-jumeirah',
  '8': 'business-bay',
  '9': 'downtown-dubai',
  '10': 'international-properties'
};

interface LocalImageMapping {
  category: string;
  images: string[];
  localPaths: string[];
}

async function setupLocalImages(): Promise<void> {
  console.log('🚀 Setting up local image mapping...');
  
  // Navigate to project root (two levels up from apps/api)
  const projectRoot = join(process.cwd(), '../..');
  const imgRootPath = join(projectRoot, 'img');
  
  console.log(`📁 Source: ${imgRootPath}`);
  
  const imageMapping: LocalImageMapping[] = [];
  let totalImages = 0;

  try {
    // Scan all numbered folders
    for (const folderName of Object.keys(IMAGE_CATEGORIES)) {
      const folderPath = join(imgRootPath, folderName);
      const category = IMAGE_CATEGORIES[folderName as keyof typeof IMAGE_CATEGORIES];
      
      try {
        const files = await readdir(folderPath);
        const imageFiles = files.filter(file => 
          extname(file).toLowerCase() === '.webp'
        );

        console.log(`📂 Processing folder ${folderName} (${category}): ${imageFiles.length} images`);

        const categoryImages: string[] = [];
        const categoryPaths: string[] = [];

        for (const imageFile of imageFiles) {
          totalImages++;
          const localPath = join(folderPath, imageFile);
          
          // Create a local URL that can be served by the backend
          const localUrl = `/images/${category}/${basename(imageFile, '.webp')}.webp`;
          
          categoryImages.push(localUrl);
          categoryPaths.push(localPath);
          
          console.log(`  📁 Mapped: ${imageFile} → ${localUrl}`);
        }

        imageMapping.push({
          category,
          images: categoryImages,
          localPaths: categoryPaths
        });

      } catch (error) {
        console.error(`❌ Error processing folder ${folderName}:`, error);
      }
    }

    // Generate results summary
    console.log('\n📊 Local Image Setup Summary:');
    console.log(`  Total Images: ${totalImages}`);
    console.log(`  Categories: ${imageMapping.length}`);
    console.log(`  Images per category: ${imageMapping[0]?.images.length || 0}`);

    // Save mapping to file for seed script
    const mappingPath = join(projectRoot, 'apps/api/scripts/local-image-mapping.json');
    await writeFile(mappingPath, JSON.stringify(imageMapping, null, 2));
    
    console.log(`\n📝 Local image mapping saved to: ${mappingPath}`);
    console.log('🎯 You can now use these local image URLs in your seed script!');
    
    // Also create a simple mapping for the seed script
    const simpleMapping: Record<string, string[]> = {};
    imageMapping.forEach(cat => {
      simpleMapping[cat.category] = cat.images;
    });
    
    const simpleMappingPath = join(projectRoot, 'apps/api/scripts/simple-image-mapping.json');
    await writeFile(simpleMappingPath, JSON.stringify(simpleMapping, null, 2));
    
    console.log(`📝 Simple mapping also saved to: ${simpleMappingPath}`);

  } catch (error) {
    console.error('❌ Fatal error during local image setup:', error);
    process.exit(1);
  }
}

// Run the setup process
setupLocalImages().catch(console.error);
