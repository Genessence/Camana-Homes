# Property Images Folder

This folder contains local images for property listings.

## Folder Structure
```
public/images/properties/
├── 1/                    # Property 1 (Excel row 1)
│   ├── 1.jpg (primary)
│   ├── 2.jpg
│   ├── 3.jpg
│   ├── 4.jpg
│   ├── 5.jpg
│   └── 6.jpg
├── 2/                    # Property 2 (Excel row 2)
│   ├── 1.jpg (primary)
│   ├── 2.jpg
│   ├── 3.jpg
│   ├── 4.jpg
│   ├── 5.jpg
│   └── 6.jpg
└── 10/                   # Property 10 (Excel row 10)
    ├── 1.jpg (primary)
    ├── 2.jpg
    ├── 3.jpg
    ├── 4.jpg
    ├── 5.jpg
    └── 6.jpg
```

## Naming Convention
- Folder name: `1`, `2`, `3`, ..., `10` (matches Excel row order)
- Images: `1.jpg`, `2.jpg`, `3.jpg` etc. (1.jpg is always primary)
- Supported formats: JPG, PNG, WebP

## Image Guidelines
- Primary image (1.jpg): Best exterior/overview shot
- Secondary images: Interior, amenities, views
- Recommended size: 1200x800px minimum
- File size: Under 500KB per image

## How It Works
1. Upload your property images to the appropriate numbered folder (1, 2, 3, ..., 10)
2. Run the import script - it will automatically detect local images
3. Images will be served from `/images/properties/[folder-number]/[image-number].jpg`
4. When going live, we'll migrate to cloud storage

## Mapping
- Excel Row 1 → Folder `1` → Property 1
- Excel Row 2 → Folder `2` → Property 2
- Excel Row 3 → Folder `3` → Property 3
- ...
- Excel Row 10 → Folder `10` → Property 10
