import asyncio
from sqlalchemy import select, text
from db import SessionLocal
from models import Property, PropertyImage

async def remove_thai_property():
    """Remove the problematic Thai property and set a different property as featured"""
    async with SessionLocal() as db:
        try:
            # Find the Thai property
            thai_property = (await db.execute(
                select(Property).where(Property.id == 11)
            )).scalars().first()
            
            if thai_property:
                print(f"Found Thai property: {thai_property.title} (ID: {thai_property.id})")
                
                # Remove associated images first
                images = (await db.execute(
                    select(PropertyImage).where(PropertyImage.property_id == thai_property.id)
                )).scalars().all()
                
                for img in images:
                    await db.delete(img)
                    print(f"Deleted image: {img.url}")
                
                # Remove the property
                await db.delete(thai_property)
                print(f"Deleted property: {thai_property.title}")
                
                # Set a different property as featured (let's use the first available property)
                other_properties = (await db.execute(
                    select(Property).where(Property.id != 11).limit(3)
                )).scalars().all()
                
                if other_properties:
                    # Set the first property as featured
                    featured_property = other_properties[0]
                    featured_property.is_featured = True
                    print(f"Set '{featured_property.title}' (ID: {featured_property.id}) as featured")
                    
                    # Unset featured for other properties
                    for prop in other_properties[1:]:
                        prop.is_featured = False
                        print(f"Unset featured for '{prop.title}' (ID: {prop.id})")
                
                await db.commit()
                print("✅ Thai property removed and featured property updated successfully!")
                
                # Verify the changes
                featured_properties = (await db.execute(
                    select(Property).where(Property.is_featured == True)
                )).scalars().all()
                
                print(f"⭐ Featured properties after update: {len(featured_properties)}")
                for prop in featured_properties:
                    print(f"  - {prop.title} (ID: {prop.id})")
                    
            else:
                print("❌ Thai property (ID: 11) not found!")
                
        except Exception as e:
            print(f"❌ Error: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(remove_thai_property())
