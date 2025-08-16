#!/usr/bin/env python3
"""
Check Database Contents
"""

import asyncio
from sqlalchemy import select, func
from api.db import SessionLocal
from api.models import Property, PropertyImage, Agent, Agency

async def check_database():
    """Check what's in the database"""
    print("🔍 Checking Database Contents...")
    print("=" * 40)
    
    async with SessionLocal() as session:
        # Check property count
        count = (await session.execute(select(func.count(Property.id)))).scalar() or 0
        print(f"📊 Total Properties: {count}")
        
        if count == 0:
            print("❌ No properties found in database!")
            return
        
        # Get all properties
        properties = (await session.execute(select(Property))).scalars().all()
        
        print(f"\n🏠 Properties in Database:")
        print("-" * 40)
        for i, prop in enumerate(properties, 1):
            print(f"{i}. {prop.title}")
            print(f"   Slug: {prop.slug}")
            print(f"   Price: ${prop.price_amount:,.0f}")
            print(f"   Location: {prop.location_label}")
            print(f"   Bedrooms: {prop.bedrooms}, Bathrooms: {prop.bathrooms}")
            
            # Check images
            images = (await session.execute(
                select(PropertyImage).where(PropertyImage.property_id == prop.id)
            )).scalars().all()
            print(f"   Images: {len(images)} found")
            for img in images[:3]:  # Show first 3 images
                print(f"     - {img.url}")
            if len(images) > 3:
                print(f"     ... and {len(images) - 3} more")
            print()
        
        # Check agents
        agents = (await session.execute(select(Agent))).scalars().all()
        print(f"👤 Agents in Database: {len(agents)}")
        for agent in agents:
            print(f"   - {agent.name}")
        
        # Check agencies
        agencies = (await session.execute(select(Agency))).scalars().all()
        print(f"🏢 Agencies in Database: {len(agencies)}")
        for agency in agencies:
            print(f"   - {agency.name}")

if __name__ == "__main__":
    asyncio.run(check_database())
