#!/usr/bin/env python3
"""
Database state checker - Check what data currently exists in the database
"""

import asyncio
from sqlalchemy import select, func
from db import SessionLocal
from models import Property, PropertyImage, Agent, Agency, HeroSlide


async def check_database_state():
    """Check the current state of the database"""
    async with SessionLocal() as db:
        print("🔍 Checking Database State...")
        print("=" * 50)
        
        # Check properties
        properties_count = await db.execute(select(func.count(Property.id)))
        properties_count = properties_count.scalar()
        print(f"📊 Properties in database: {properties_count}")
        
        if properties_count > 0:
            # Get sample properties
            properties = (await db.execute(
                select(Property).limit(5)
            )).scalars().all()
            
            print("\n📋 Sample Properties:")
            for prop in properties:
                print(f"  - ID: {prop.id}, Title: {prop.title}, Slug: {prop.slug}")
                print(f"    Trending Score: {prop.trending_score}, Views: {prop.views_count}")
        
        # Check property images
        images_count = await db.execute(select(func.count(PropertyImage.id)))
        images_count = images_count.scalar()
        print(f"\n🖼️  Property Images: {images_count}")
        
        # Check agents
        agents_count = await db.execute(select(func.count(Agent.id)))
        agents_count = agents_count.scalar()
        print(f"👤 Agents: {agents_count}")
        
        # Check agencies
        agencies_count = await db.execute(select(func.count(Agency.id)))
        agencies_count = agencies_count.scalar()
        print(f"🏢 Agencies: {agencies_count}")
        
        # Check hero slides
        slides_count = await db.execute(select(func.count(HeroSlide.id)))
        slides_count = slides_count.scalar()
        print(f"🎠 Hero Slides: {slides_count}")
        
        print("\n" + "=" * 50)
        
        if properties_count == 0:
            print("⚠️  No properties found in database!")
            print("💡 You may need to run the sample data script or import your existing data")
        else:
            print("✅ Database has data - trending endpoint should work")
            
        # Test trending query
        print("\n🧪 Testing Trending Query...")
        try:
            trending_props = (await db.execute(
                select(Property)
                .order_by(Property.trending_score.desc(), Property.created_at.desc())
                .limit(3)
            )).scalars().all()
            
            print(f"📈 Trending properties found: {len(trending_props)}")
            for prop in trending_props:
                print(f"  - {prop.title} (Score: {prop.trending_score})")
                
        except Exception as e:
            print(f"❌ Error in trending query: {e}")


if __name__ == "__main__":
    asyncio.run(check_database_state())
