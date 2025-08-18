import asyncio
from sqlalchemy import select
from db import SessionLocal
from models import Property

async def add_more_featured_properties():
    """Add more properties to the featured list"""
    async with SessionLocal() as db:
        try:
            # Get all properties that are not currently featured
            non_featured_properties = (await db.execute(
                select(Property).where(Property.is_featured == False)
            )).scalars().all()
            
            print(f"Found {len(non_featured_properties)} non-featured properties")
            
            # Get the top 4 properties by trending score (excluding the current featured one)
            top_properties = (await db.execute(
                select(Property)
                .where(Property.is_featured == False)
                .order_by(Property.trending_score.desc())
                .limit(4)
            )).scalars().all()
            
            print(f"Top 4 properties by trending score:")
            for i, prop in enumerate(top_properties, 1):
                print(f"  {i}. {prop.title} (ID: {prop.id}, Trending Score: {prop.trending_score})")
            
            # Set these properties as featured
            for prop in top_properties:
                prop.is_featured = True
                print(f"✅ Marked '{prop.title}' as featured")
            
            await db.commit()
            print("🎉 Featured properties updated successfully!")
            
            # Verify the changes
            featured_properties = (await db.execute(
                select(Property).where(Property.is_featured == True)
            )).scalars().all()
            
            print(f"\n⭐ Total featured properties: {len(featured_properties)}")
            print("Featured properties list:")
            for i, prop in enumerate(featured_properties, 1):
                print(f"  {i}. {prop.title} (ID: {prop.id})")
                
        except Exception as e:
            print(f"❌ Error: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(add_more_featured_properties())
