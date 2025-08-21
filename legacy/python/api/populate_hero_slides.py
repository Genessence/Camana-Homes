import asyncio
from sqlalchemy import select, text
from db import SessionLocal
from models import HeroSlide, Property, PropertyImage

async def populate_hero_slides():
    """Populate hero slides with property data"""
    async with SessionLocal() as db:
        # Get some properties to use for hero slides
        properties = (
            await db.execute(
                select(Property)
                .order_by(Property.trending_score.desc())
                .limit(5)
            )
        ).scalars().all()
        
        if not properties:
            print("❌ No properties found in database!")
            return
        
        print(f"Found {len(properties)} properties to use for hero slides")
        
        # Clear existing hero slides
        await db.execute(text("DELETE FROM hero_slides"))
        
        # Create new hero slides with property data
        for i, prop in enumerate(properties):
            # Get the first image for this property
            images = (
                await db.execute(
                    select(PropertyImage)
                    .where(PropertyImage.property_id == prop.id)
                    .order_by(PropertyImage.sort_order.asc())
                    .limit(1)
                )
            ).scalars().all()
            
            image_url = images[0].url if images else "https://api.builder.io/api/v1/image/assets/TEMP/150215d44c18f289f544dd9db57e5320bbc85d85?width=3200"
            
            hero_slide = HeroSlide(
                image_url=image_url,
                title=prop.title,
                subtitle=f"By {prop.developer or 'Developer'}, {prop.location_label}",
                property_id=prop.id,
                sort_order=i,
                is_active=True
            )
            
            db.add(hero_slide)
            print(f"✅ Created hero slide for: {prop.title}")
        
        await db.commit()
        print("🎉 Hero slides populated successfully!")

if __name__ == "__main__":
    asyncio.run(populate_hero_slides())
