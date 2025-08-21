# Assets Directory

This directory contains all static assets for the Camana Homes website.

## Structure

```
public/assets/
├── images/
│   ├── stay-in-the-know/
│   │   ├── gallery.jpg      # Gallery carousel image (800x600px recommended)
│   │   ├── video-bg.jpg     # Video background image (600x400px recommended)
│   │   └── promo.jpg        # Promo image (800x1200px recommended)
│   ├── hero/                # Hero section images
│   ├── properties/          # Property listing images
│   └── logos/               # Logo and branding assets
├── icons/                   # SVG icons and small graphics
└── fonts/                   # Custom fonts (if any)
```

## Adding Images

### For Stay in the Know Section:
1. Replace the placeholder files in `images/stay-in-the-know/` with actual JPG images
2. Recommended sizes:
   - `gallery.jpg`: 800x600px (4:3 aspect ratio)
   - `video-bg.jpg`: 600x400px (3:2 aspect ratio)
   - `promo.jpg`: 800x1200px (2:3 aspect ratio)

### Image Guidelines:
- Use JPG format for photographs
- Use PNG format for graphics with transparency
- Optimize images for web (compress to reduce file size)
- Use descriptive filenames
- Maintain consistent aspect ratios

## Fallback System

The components include fallback images that will display if local assets are not found. This ensures the website always has content to show, even if images are missing.

## Production Deployment

When deploying to production:
1. Ensure all image files are included in the build
2. Verify that image paths are correct
3. Test that fallback images work properly
4. Optimize images for performance

## File Naming Convention

- Use lowercase letters
- Separate words with hyphens
- Include descriptive terms
- Example: `hero-main-banner.jpg`, `property-exterior-view.jpg`
