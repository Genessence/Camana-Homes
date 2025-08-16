#!/usr/bin/env python3
"""
Clear Demo Data from Database
"""

import asyncio
from sqlalchemy import select, delete
from api.db import SessionLocal
from api.models import Property, PropertyImage, Agent, Agency, Article

async def clear_demo_data():
    """Remove all demo/placeholder data from database"""
    print("🧹 Clearing Demo Data...")
    print("=" * 40)
    
    async with SessionLocal() as session:
        # Find demo properties (those with builder.io URLs)
        demo_properties = (await session.execute(
            select(Property).join(PropertyImage).where(
                PropertyImage.url.like('%builder.io%')
            )
        )).scalars().all()
        
        print(f"📊 Found {len(demo_properties)} demo properties to remove")
        
        for prop in demo_properties:
            print(f"🗑️  Removing: {prop.title}")
            
            # Delete associated images first
            await session.execute(
                delete(PropertyImage).where(PropertyImage.property_id == prop.id)
            )
            
            # Delete the property
            await session.execute(
                delete(Property).where(Property.id == prop.id)
            )
        
        # Find and remove demo agents
        demo_agents = (await session.execute(
            select(Agent).where(Agent.avatar_url.like('%builder.io%'))
        )).scalars().all()
        
        print(f"👤 Found {len(demo_agents)} demo agents to remove")
        for agent in demo_agents:
            print(f"🗑️  Removing agent: {agent.name}")
            await session.execute(delete(Agent).where(Agent.id == agent.id))
        
        # Find and remove demo agencies
        demo_agencies = (await session.execute(
            select(Agency).where(Agency.logo_url.like('%builder.io%'))
        )).scalars().all()
        
        print(f"🏢 Found {len(demo_agencies)} demo agencies to remove")
        for agency in demo_agencies:
            print(f"🗑️  Removing agency: {agency.name}")
            await session.execute(delete(Agency).where(Agency.id == agency.id))
        
        # Remove demo articles
        demo_articles = (await session.execute(
            select(Article).where(Article.image_url.like('%builder.io%'))
        )).scalars().all()
        
        print(f"📰 Found {len(demo_articles)} demo articles to remove")
        for article in demo_articles:
            print(f"🗑️  Removing article: {article.title}")
            await session.execute(delete(Article).where(Article.id == article.id))
        
        await session.commit()
        
        # Show final counts
        remaining_properties = (await session.execute(select(Property))).scalars().all()
        remaining_agents = (await session.execute(select(Agent))).scalars().all()
        remaining_agencies = (await session.execute(select(Agency))).scalars().all()
        remaining_articles = (await session.execute(select(Article))).scalars().all()
        
        print("\n📊 Final Database State:")
        print(f"🏠 Properties: {len(remaining_properties)}")
        print(f"👤 Agents: {len(remaining_agents)}")
        print(f"🏢 Agencies: {len(remaining_agencies)}")
        print(f"📰 Articles: {len(remaining_articles)}")
        
        print("\n✅ Demo data cleared successfully!")

if __name__ == "__main__":
    asyncio.run(clear_demo_data())
