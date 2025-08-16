#!/usr/bin/env python3
"""
Import Property Data from Excel File
"""

import os
import pandas as pd
import asyncio
from sqlalchemy import select
from api.db import SessionLocal
from api.models import Property, PropertyImage, Agent, Agency

def safe_int(value):
    """Safely convert value to integer"""
    if pd.isna(value) or value == "Not specified" or value == "Studio/1BR":
        return None
    try:
        return int(float(value))
    except (ValueError, TypeError):
        return None

def safe_float(value):
    """Safely convert value to float"""
    if pd.isna(value) or value == "Not specified":
        return None
    try:
        return float(value)
    except (ValueError, TypeError):
        return None

def clean_text(value):
    """Clean text values"""
    if pd.isna(value):
        return None
    return str(value).strip()

async def import_properties_from_excel():
    """Import property data from Excel file"""
    print("📊 Importing Properties from Excel...")
    print("=" * 40)
    
    # Read Excel file
    excel_file = "properties.xlsx"
    if not os.path.exists(excel_file):
        print(f"❌ Excel file '{excel_file}' not found!")
        return
    
    df = pd.read_excel(excel_file)
    print(f"📋 Found {len(df)} properties in Excel")
    
    async with SessionLocal() as session:
        for index, row in df.iterrows():
            print(f"\n🏠 Processing property {index + 1}: {row['Title']}")
            
            # Create or get agent
            agent_name = clean_text(row.get('Agent Name', 'Unknown Agent'))
            agent = (await session.execute(
                select(Agent).where(Agent.name == agent_name)
            )).scalar_one_or_none()
            
            if not agent:
                agent = Agent(
                    name=agent_name,
                    avatar_url="/img/agent-avatar.jpg"  # Placeholder
                )
                session.add(agent)
                await session.flush()  # Get the ID
            
            # Create or get agency
            agency_name = clean_text(row.get('Agency Name', 'Unknown Agency'))
            agency = (await session.execute(
                select(Agency).where(Agency.name == agency_name)
            )).scalar_one_or_none()
            
            if not agency:
                agency = Agency(
                    name=agency_name,
                    logo_url="/img/agency-logo.jpg"  # Placeholder
                )
                session.add(agency)
                await session.flush()  # Get the ID
            
            # Create property
            property_data = {
                'title': clean_text(row['Title']),
                'slug': clean_text(row['Slug']),
                'price_amount': safe_float(row.get('Price Amount', 0)),
                'price_currency': clean_text(row.get('Price Currency', 'USD')),
                'price_per_sqft': safe_float(row.get('Price Per Sqft')),
                'property_type': clean_text(row.get('Property Type', 'Apartment')),
                'bedrooms': safe_int(row.get('Bedrooms')),
                'bathrooms': safe_int(row.get('Bathrooms')),
                'area_value': safe_float(row.get('Area Value')),
                'area_unit': clean_text(row.get('Area Unit', 'sqft')),
                'location_label': clean_text(row.get('Location Label', 'Dubai')),
                'outdoor_features': clean_text(row.get('Outdoor Features')),
                'indoor_features': clean_text(row.get('Indoor Features')),
                'view_description': clean_text(row.get('View Description')),
                'year_built': safe_int(row.get('Year Built')),
                'description': clean_text(row.get('Description')),
                'saves_count': safe_int(row.get('Saves Count', 0)),
                'completion_date': clean_text(row.get('Completion Date')),
                'payment_options': clean_text(row.get('Payment Options')),
                'key_amenities': clean_text(row.get('Key Amenities')),
                'location_distances': clean_text(row.get('Location Distances')),
                'developer': clean_text(row.get('Developer')),
                'has_video': bool(row.get('Has Video', False)),
                'has_virtual_tour': bool(row.get('Has Virtual Tour', False)),
                'views_count': safe_int(row.get('Views Count', 0)),
                'trending_score': safe_int(row.get('Trending Score', 50)),
                'is_featured': bool(row.get('Is Featured', False)),
                'agent_id': agent.id,
                'agency_id': agency.id
            }
            
            # Remove None values
            property_data = {k: v for k, v in property_data.items() if v is not None}
            
            property_obj = Property(**property_data)
            session.add(property_obj)
            await session.flush()  # Get the property ID
            
            # Add images
            folder_number = index + 1
            local_image_folder = f"img/{folder_number}"
            local_images = []
            
            if os.path.exists(local_image_folder):
                image_extensions = ['.jpg', '.jpeg', '.png', '.webp']
                for file in sorted(os.listdir(local_image_folder)):
                    if any(file.lower().endswith(ext) for ext in image_extensions):
                        local_images.append(f"/img/{folder_number}/{file}")
            
            # Add images to database
            for i, image_url in enumerate(local_images):
                image = PropertyImage(
                    property_id=property_obj.id,
                    url=image_url,
                    alt_text=f"Property image {i + 1}",
                    is_primary=(i == 0)  # First image is primary
                )
                session.add(image)
            
            print(f"✅ Added property: {property_obj.title}")
            print(f"   Images: {len(local_images)} found")
            print(f"   Agent: {agent.name}")
            print(f"   Agency: {agency.name}")
        
        await session.commit()
        print(f"\n🎉 Successfully imported {len(df)} properties!")

if __name__ == "__main__":
    asyncio.run(import_properties_from_excel())
