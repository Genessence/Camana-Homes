import asyncio
from sqlalchemy import select, text
from db import SessionLocal
from models import Property

async def check_featured_properties():
    """Check and fix featured properties"""
    async with SessionLocal() as db:
        # Check if is_featured column exists
        try:
            result = await db.execute(text("""
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = 'properties' AND column_name = 'is_featured'
            """))
            
            if not result.fetchone():
                print("❌ is_featured column does not exist in properties table!")
                print("Adding is_featured column...")
                await db.execute(text("""
                    ALTER TABLE properties 
                    ADD COLUMN is_featured BOOLEAN DEFAULT FALSE
                """))
                await db.commit()
                print("✅ is_featured column added successfully!")
            else:
                print("✅ is_featured column exists!")
        except Exception as e:
            print(f"❌ Error checking is_featured column: {e}")
            return

        # Check how many properties exist
        total_properties = (await db.execute(select(Property))).scalars().all()
        print(f"📊 Total properties in database: {len(total_properties)}")

        # Check how many featured properties exist
        featured_properties = (await db.execute(
            select(Property).where(Property.is_featured == True)
        )).scalars().all()
        print(f"⭐ Featured properties: {len(featured_properties)}")

        if len(featured_properties) == 0 and len(total_properties) > 0:
            print("🔧 No featured properties found. Setting top 3 trending properties as featured...")
            
            # Get top 3 trending properties and mark them as featured
            top_properties = (await db.execute(
                select(Property)
                .order_by(Property.trending_score.desc())
                .limit(3)
            )).scalars().all()
            
            for prop in top_properties:
                prop.is_featured = True
                print(f"✅ Marked '{prop.title}' as featured")
            
            await db.commit()
            print("🎉 Featured properties set successfully!")
        elif len(featured_properties) > 0:
            print("✅ Featured properties found:")
            for prop in featured_properties:
                print(f"  - {prop.title} (ID: {prop.id})")
        else:
            print("❌ No properties found in database!")

if __name__ == "__main__":
    asyncio.run(check_featured_properties())
