#!/usr/bin/env python3
"""
Setup Image Folders Script

This script creates image folders for properties based on your Excel data.
Run this before importing to create the folder structure for your images.
"""

import pandas as pd
import os
import re


def create_slug(title: str) -> str:
    """Create a URL-friendly slug from property title"""
    # Convert to lowercase and replace spaces with hyphens
    slug = re.sub(r'[^\w\s-]', '', title.lower())
    slug = re.sub(r'[-\s]+', '-', slug)
    return slug.strip('-')


def setup_image_folders(excel_file: str = "properties.xlsx"):
    """Create image folders for all properties in Excel"""
    
    try:
        df = pd.read_excel(excel_file)
        print(f"Found {len(df)} properties in {excel_file}")
    except FileNotFoundError:
        print(f"Error: {excel_file} not found. Please save your Excel file as 'properties.xlsx' in this directory.")
        return
    except Exception as e:
        print(f"Error reading Excel file: {e}")
        return

    # Create base images directory
    base_dir = "public/images/properties"
    os.makedirs(base_dir, exist_ok=True)
    
    created_folders = []
    
    for index, row in df.iterrows():
        property_name = str(row.get('Property Name', '')).strip()
        if not property_name:
            continue
            
        # Use folder number (1, 2, 3, ..., 10) instead of slug
        folder_number = index + 1
        folder_path = os.path.join(base_dir, str(folder_number))
        
        if not os.path.exists(folder_path):
            os.makedirs(folder_path, exist_ok=True)
            created_folders.append(folder_number)
            
            # Create a README file in each folder
            readme_content = f"""# Property {folder_number} Images - {property_name}

Place your property images here:
- `1.jpg` - Primary/hero image (exterior view)
- `2.jpg` - Interior view  
- `3.jpg` - Amenities
- `4.jpg` - Additional view
- `5.jpg` - Additional view
- `6.jpg` - Additional view

## Image Requirements
- Format: JPG, PNG, or WebP
- Size: 1200x800px minimum
- File size: Under 500KB each
- Naming: Use numbers (1.jpg, 2.jpg, etc.)

## Example URLs
Once uploaded, images will be accessible at:
- `/images/properties/{folder_number}/1.jpg`
- `/images/properties/{folder_number}/2.jpg`
- etc.

## Property Details
- Name: {property_name}
- Excel Row: {index + 1}
"""
            
            with open(os.path.join(folder_path, 'README.md'), 'w') as f:
                f.write(readme_content)
            
            print(f"✓ Created folder: {folder_path} for {property_name}")
        else:
            print(f"  Folder already exists: {folder_path}")
    
    print(f"\n✅ Created {len(created_folders)} new image folders")
    print("\nNext steps:")
    print("1. Add your property images to the created folders (1, 2, 3, ..., 10)")
    print("2. Name them 1.jpg, 2.jpg, 3.jpg, etc.")
    print("3. Run: python import_excel.py")


if __name__ == "__main__":
    print("Camana Homes - Image Folder Setup")
    print("=" * 40)
    setup_image_folders()
