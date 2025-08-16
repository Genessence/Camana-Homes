#!/usr/bin/env python3
"""
Quick Database Check
"""

import asyncio
from sqlalchemy import select
from api.db import SessionLocal
from api.models import Property, PropertyImage

async def quick_check():
    """Quick check of properties and their images"""
    print("🔍 Quick Database Check...")
    print("=" * 40)
    
    async with SessionLocal() as session:
        properties = (await session.execute(select(Property))).scalars().all()
        print(f"📊 Total Properties: {len(properties)}")
        
        for i, prop in enumerate(properties, 1):
            print(f"\n{i}. {prop.title}")
            print(f"   Slug: {prop.slug}")
            print(f"   Price: ${prop.price_amount:,.0f}")
            print(f"   Location: {prop.location_label}")
            print(f"   Trending Score: {prop.trending_score}")
            
            # Check images
            images = (await session.execute(
                select(PropertyImage).where(PropertyImage.property_id == prop.id)
            )).scalars().all()
            
            print(f"   Images: {len(images)}")
            for img in images[:2]:  # Show first 2 images
                print(f"     - {img.url}")
            if len(images) > 2:
                print(f"     ... and {len(images) - 2} more")

if __name__ == "__main__":
    asyncio.run(quick_check())
