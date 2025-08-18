import asyncio
from sqlalchemy import text
from db import engine

async def migrate_hero_slides():
    """Add property_id column to hero_slides table"""
    async with engine.begin() as conn:
        # Check if property_id column already exists
        result = await conn.execute(text("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'hero_slides' AND column_name = 'property_id'
        """))
        
        if not result.fetchone():
            print("Adding property_id column to hero_slides table...")
            await conn.execute(text("""
                ALTER TABLE hero_slides 
                ADD COLUMN property_id INTEGER REFERENCES properties(id)
            """))
            print("✅ property_id column added successfully!")
        else:
            print("✅ property_id column already exists!")

if __name__ == "__main__":
    asyncio.run(migrate_hero_slides())
