#!/usr/bin/env python3
"""
Update Trending Scores for Real Properties
"""

import asyncio
from sqlalchemy import select, update
from api.db import SessionLocal
from api.models import Property, PropertyImage

async def update_trending_scores():
    """Update trending scores to prioritize real properties"""
    print("📈 Updating Trending Scores...")
    print("=" * 40)
    
    async with SessionLocal() as session:
        # Get all properties with their images
        properties = (await session.execute(
            select(Property).outerjoin(PropertyImage)
        )).scalars().all()
        
        print(f"📊 Found {len(properties)} properties")
        
        # Identify real properties (those with /img/ in their image URLs)
        real_properties = []
        demo_properties = []
        
        for prop in properties:
            # Check if this property has real images
            images = (await session.execute(
                select(PropertyImage).where(PropertyImage.property_id == prop.id)
            )).scalars().all()
            
            has_real_images = any('/img/' in img.url for img in images)
            
            if has_real_images:
                real_properties.append(prop)
            else:
                demo_properties.append(prop)
        
        print(f"🏠 Real properties: {len(real_properties)}")
        print(f"🎭 Demo properties: {len(demo_properties)}")
        
        # Update real properties with high trending scores (100-94)
        for i, prop in enumerate(real_properties):
            score = 100 - i  # 100, 99, 98, 97, 96, 95, 94
            await session.execute(
                update(Property).where(Property.id == prop.id).values(trending_score=score)
            )
            print(f"✅ {prop.title}: trending_score = {score}")
        
        # Update demo properties with low trending scores (10-8)
        for i, prop in enumerate(demo_properties):
            score = 10 - i  # 10, 9, 8
            await session.execute(
                update(Property).where(Property.id == prop.id).values(trending_score=score)
            )
            print(f"📉 {prop.title}: trending_score = {score}")
        
        await session.commit()
        
        # Show final trending scores
        print("\n📊 Final Trending Scores:")
        print("-" * 40)
        properties_with_scores = (await session.execute(
            select(Property).order_by(Property.trending_score.desc())
        )).scalars().all()
        
        for prop in properties_with_scores:
            print(f"• {prop.title}: {prop.trending_score}")
        
        print("\n🎉 Trending scores updated successfully!")

if __name__ == "__main__":
    asyncio.run(update_trending_scores())
