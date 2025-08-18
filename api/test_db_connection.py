import asyncio
from sqlalchemy import select
from db import SessionLocal
from models import Property

async def test_db_connection():
    """Test database connection and check properties"""
    try:
        async with SessionLocal() as db:
            print("✅ Database connection successful!")
            
            # Check total properties
            total_properties = (await db.execute(select(Property))).scalars().all()
            print(f"📊 Total properties in database: {len(total_properties)}")
            
            if len(total_properties) > 0:
                print("✅ Properties found in database:")
                for prop in total_properties[:3]:  # Show first 3
                    print(f"  - {prop.title} (ID: {prop.id}, Featured: {prop.is_featured})")
                
                # Check featured properties
                featured_properties = (await db.execute(
                    select(Property).where(Property.is_featured == True)
                )).scalars().all()
                print(f"⭐ Featured properties: {len(featured_properties)}")
                
                if len(featured_properties) > 0:
                    print("✅ Featured properties found:")
                    for prop in featured_properties:
                        print(f"  - {prop.title} (ID: {prop.id})")
                else:
                    print("⚠️  No featured properties found")
            else:
                print("❌ No properties found in database!")
                
    except Exception as e:
        print(f"❌ Database connection error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_db_connection())
