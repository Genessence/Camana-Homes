#!/usr/bin/env python3
"""
Migrate existing data to include enhanced fields
This script safely updates existing properties with default values for new fields
"""

import asyncio
from sqlalchemy import select, update
from db import SessionLocal
from models import Property


async def migrate_existing_data():
    """Migrate existing properties to include enhanced fields"""
    async with SessionLocal() as db:
        print("🔄 Migrating existing data...")
        
        # Get all existing properties
        properties = (await db.execute(select(Property))).scalars().all()
        
        if not properties:
            print("ℹ️  No existing properties found to migrate")
            return
        
        print(f"📊 Found {len(properties)} existing properties to migrate")
        
        # Update each property with default values for new fields
        for prop in properties:
            print(f"  - Migrating: {prop.title}")
            
            # Set default values for new fields if they're None
            updates = {}
            
            # Enhanced property details
            if prop.total_stories is None:
                updates['total_stories'] = 1
            if prop.full_bathrooms is None:
                updates['full_bathrooms'] = prop.bathrooms or 1
            if prop.half_bathrooms is None:
                updates['half_bathrooms'] = 0
            if prop.lot_size is None:
                updates['lot_size'] = "Standard"
            if prop.permit_number is None:
                updates['permit_number'] = f"P{prop.id:06d}"
            if prop.ded_number is None:
                updates['ded_number'] = f"D{prop.id:04d}"
            if prop.mls_id is None:
                updates['mls_id'] = f"MLS{prop.id:06d}"
            
            # Interior features
            if prop.interior_features is None:
                updates['interior_features'] = []
            if prop.appliances is None:
                updates['appliances'] = []
            if prop.floor_description is None:
                updates['floor_description'] = "Standard Flooring"
            if prop.fireplace is None:
                updates['fireplace'] = False
            if prop.fireplace_description is None:
                updates['fireplace_description'] = ""
            if prop.cooling is None:
                updates['cooling'] = True
            if prop.cooling_description is None:
                updates['cooling_description'] = "Central Air"
            if prop.heating is None:
                updates['heating'] = True
            if prop.heating_description is None:
                updates['heating_description'] = "Central Heating"
            if prop.basement is None:
                updates['basement'] = False
            
            # Exterior features
            if prop.exterior_features is None:
                updates['exterior_features'] = []
            if prop.lot_features is None:
                updates['lot_features'] = "Standard"
            if prop.sewer is None:
                updates['sewer'] = "Public Sewer"
            if prop.patio_porch is None:
                updates['patio_porch'] = ""
            
            # School information
            if prop.high_school is None:
                updates['high_school'] = "Local High School"
            if prop.elementary_school is None:
                updates['elementary_school'] = "Local Elementary School"
            
            # Other property details
            if prop.taxes is None:
                updates['taxes'] = "$0"
            if prop.tax_frequency is None:
                updates['tax_frequency'] = "Annually"
            if prop.days_on_market is None:
                updates['days_on_market'] = 0
            if prop.accessibility is None:
                updates['accessibility'] = "Standard"
            if prop.garage is None:
                updates['garage'] = False
            if prop.garage_spaces is None:
                updates['garage_spaces'] = 0
            if prop.parking is None:
                updates['parking'] = "Street"
            if prop.parking_total is None:
                updates['parking_total'] = 0
            if prop.view is None:
                updates['view'] = "Standard"
            if prop.county is None:
                updates['county'] = "Local County"
            if prop.water_source is None:
                updates['water_source'] = "Public"
            if prop.new_construction is None:
                updates['new_construction'] = False
            if prop.pool is None:
                updates['pool'] = False
            if prop.pool_features is None:
                updates['pool_features'] = ""
            if prop.utilities is None:
                updates['utilities'] = ["Electricity Available", "Water Available"]
            
            # Apply updates if any
            if updates:
                await db.execute(
                    update(Property)
                    .where(Property.id == prop.id)
                    .values(**updates)
                )
                print(f"    ✅ Updated {len(updates)} fields")
            else:
                print(f"    ℹ️  No updates needed")
        
        await db.commit()
        print(f"\n✅ Successfully migrated {len(properties)} properties!")
        print("🎉 Your existing data now includes all enhanced fields")


if __name__ == "__main__":
    asyncio.run(migrate_existing_data())
