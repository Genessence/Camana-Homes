#!/usr/bin/env python3
"""
Sample data script for enhanced Listing Page backend
This script populates the database with sample property data that includes all the detailed information
"""

import asyncio
import json
from decimal import Decimal
from datetime import datetime, timezone
from sqlalchemy import select
from db import SessionLocal
from models import Property, PropertyImage, Agent, Agency


async def create_sample_data():
    """Create sample enhanced property data"""
    async with SessionLocal() as db:
        print("Creating sample enhanced property data...")
        
        # Create agency
        agency = Agency(
            name="Camana Real Estate",
            logo_url="https://via.placeholder.com/200x80/ff0000/ffffff?text=Camana+Homes"
        )
        db.add(agency)
        await db.commit()
        await db.refresh(agency)
        
        # Create agent
        agent = Agent(
            name="Sarah Johnson",
            avatar_url="https://via.placeholder.com/100x100/666666/ffffff?text=SJ",
            agency_id=agency.id,
            phone_number="+1 (555) 123-4567",
            email="sarah.johnson@camana.com"
        )
        db.add(agent)
        await db.commit()
        await db.refresh(agent)
        
        # Create enhanced property
        property_data = {
            "slug": "thai-style-villa-ocean-view",
            "title": "Thai Style Villa With Ocean View",
            "price_amount": Decimal("5500000.00"),
            "price_currency": "USD",
            "price_per_sqft": Decimal("1615.65"),
            "property_type": "Residential",
            "bedrooms": 6,
            "bathrooms": 9,
            "area_value": 9408,
            "area_unit": "sqft",
            "location_label": "Street, Dubai, 00000, UAE",
            
            # Enhanced property details
            "total_stories": 3,
            "full_bathrooms": 7,
            "half_bathrooms": 2,
            "lot_size": "1.15 Acres",
            "permit_number": "2745887",
            "ded_number": "1297",
            "mls_id": "2745887",
            
            # Interior features
            "interior_features": [
                "Bookcases", "Elevator", "Entry Foyer", "Extra Closets", 
                "High Ceilings", "Storage", "Walk-In Closet(s)", "Wet Bar", 
                "Primary Bedroom Main Floor", "Kitchen Island"
            ],
            "appliances": [
                "Dishwasher", "Freezer", "Grill", "Ice Maker", 
                "Microwave", "Refrigerator"
            ],
            "floor_description": "Finished Wood, Marble, Tile",
            "fireplace": True,
            "fireplace_description": "Gas, Wood Burning",
            "cooling": True,
            "cooling_description": "Central Air, Electric",
            "heating": True,
            "heating_description": "Natural Gas",
            "basement": True,
            
            # Exterior features
            "exterior_features": ["Irrigation System"],
            "lot_features": "Level",
            "sewer": "Public Sewer",
            "patio_porch": "Covered Patio, Covered Porch, Patio",
            
            # School information
            "high_school": "Hillsboro Comp High School",
            "elementary_school": "Julia Green Elementary",
            
            # Other property details
            "taxes": "$15,064",
            "tax_frequency": "Annually",
            "days_on_market": 1,
            "accessibility": "Accessible Elevator Installed",
            "garage": True,
            "garage_spaces": 3,
            "parking": "Attached",
            "parking_total": 3,
            "view": "No",
            "county": "Davidson County, TN",
            "water_source": "Public",
            "new_construction": True,
            "pool": True,
            "pool_features": "In Ground",
            "utilities": [
                "Electricity Available", "Natural Gas Available", "Water Available"
            ],
            
            # Existing fields
            "outdoor_features": ["Pool", "Garden", "Terrace"],
            "indoor_features": ["Elevator", "Smart Home", "Wine Cellar"],
            "view_description": "Ocean View",
            "year_built": 2024,
            "description": "Luxurious Thai-style villa with breathtaking ocean views. This stunning property features premium finishes, smart home technology, and world-class amenities.",
            "saves_count": 78,
            "completion_date": "Q4 2024",
            "payment_options": "Cash, Mortgage, Installments",
            "key_amenities": ["Private Pool", "Gym", "Spa", "Wine Cellar"],
            "location_distances": [
                {"place": "Beach", "distance": "0.5 km"},
                {"place": "Airport", "distance": "15 km"},
                {"place": "Downtown", "distance": "8 km"}
            ],
            "developer": "Camana Development",
            "has_video": True,
            "has_virtual_tour": True,
            "views_count": 2440,
            "trending_score": 95,
            "is_featured": True,
            "agent_id": agent.id,
        }
        
        property_obj = Property(**property_data)
        db.add(property_obj)
        await db.commit()
        await db.refresh(property_obj)
        
        # Create property images
        images_data = [
            {
                "url": "https://via.placeholder.com/808x600/4a90e2/ffffff?text=Main+Image",
                "sort_order": 0,
                "is_primary": True,
                "alt_text": "Main property image"
            },
            {
                "url": "https://via.placeholder.com/400x287/50c878/ffffff?text=Image+2",
                "sort_order": 1,
                "is_primary": False,
                "alt_text": "Property exterior"
            },
            {
                "url": "https://via.placeholder.com/400x287/e74c3c/ffffff?text=Image+3",
                "sort_order": 2,
                "is_primary": False,
                "alt_text": "Living room"
            },
            {
                "url": "https://via.placeholder.com/400x287/f39c12/ffffff?text=Image+4",
                "sort_order": 3,
                "is_primary": False,
                "alt_text": "Kitchen"
            },
            {
                "url": "https://via.placeholder.com/400x287/9b59b6/ffffff?text=Image+5",
                "sort_order": 4,
                "is_primary": False,
                "alt_text": "Master bedroom"
            }
        ]
        
        for img_data in images_data:
            img_data["property_id"] = property_obj.id
            image = PropertyImage(**img_data)
            db.add(image)
        
        await db.commit()
        
        print(f"Created property: {property_obj.title}")
        print(f"Property ID: {property_obj.id}")
        print(f"Property Slug: {property_obj.slug}")
        print("Sample data created successfully!")


if __name__ == "__main__":
    asyncio.run(create_sample_data())
