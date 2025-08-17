#!/usr/bin/env python3
"""
Database migration script for enhanced Listing Page backend
This script adds new tables and columns to support the detailed property information
"""

import asyncio
from sqlalchemy import text
from db import engine


async def migrate_database():
    """Run database migrations"""
    async with engine.begin() as conn:
        print("Starting database migration...")
        
        # Add new columns to properties table
        print("Adding new columns to properties table...")
        
        # Enhanced property details
        await conn.execute(text("""
            ALTER TABLE properties 
            ADD COLUMN IF NOT EXISTS total_stories INTEGER,
            ADD COLUMN IF NOT EXISTS full_bathrooms INTEGER,
            ADD COLUMN IF NOT EXISTS half_bathrooms INTEGER,
            ADD COLUMN IF NOT EXISTS lot_size VARCHAR(100),
            ADD COLUMN IF NOT EXISTS permit_number VARCHAR(100),
            ADD COLUMN IF NOT EXISTS ded_number VARCHAR(100),
            ADD COLUMN IF NOT EXISTS mls_id VARCHAR(100)
        """))
        
        # Interior features
        await conn.execute(text("""
            ALTER TABLE properties 
            ADD COLUMN IF NOT EXISTS interior_features JSON,
            ADD COLUMN IF NOT EXISTS appliances JSON,
            ADD COLUMN IF NOT EXISTS floor_description VARCHAR(500),
            ADD COLUMN IF NOT EXISTS fireplace BOOLEAN,
            ADD COLUMN IF NOT EXISTS fireplace_description VARCHAR(500),
            ADD COLUMN IF NOT EXISTS cooling BOOLEAN,
            ADD COLUMN IF NOT EXISTS cooling_description VARCHAR(500),
            ADD COLUMN IF NOT EXISTS heating BOOLEAN,
            ADD COLUMN IF NOT EXISTS heating_description VARCHAR(500),
            ADD COLUMN IF NOT EXISTS basement BOOLEAN
        """))
        
        # Exterior features
        await conn.execute(text("""
            ALTER TABLE properties 
            ADD COLUMN IF NOT EXISTS exterior_features JSON,
            ADD COLUMN IF NOT EXISTS lot_features VARCHAR(500),
            ADD COLUMN IF NOT EXISTS sewer VARCHAR(100),
            ADD COLUMN IF NOT EXISTS patio_porch VARCHAR(500)
        """))
        
        # School information
        await conn.execute(text("""
            ALTER TABLE properties 
            ADD COLUMN IF NOT EXISTS high_school VARCHAR(255),
            ADD COLUMN IF NOT EXISTS elementary_school VARCHAR(255)
        """))
        
        # Other property details
        await conn.execute(text("""
            ALTER TABLE properties 
            ADD COLUMN IF NOT EXISTS taxes VARCHAR(100),
            ADD COLUMN IF NOT EXISTS tax_frequency VARCHAR(50),
            ADD COLUMN IF NOT EXISTS days_on_market INTEGER,
            ADD COLUMN IF NOT EXISTS accessibility VARCHAR(500),
            ADD COLUMN IF NOT EXISTS garage BOOLEAN,
            ADD COLUMN IF NOT EXISTS garage_spaces INTEGER,
            ADD COLUMN IF NOT EXISTS parking VARCHAR(100),
            ADD COLUMN IF NOT EXISTS parking_total INTEGER,
            ADD COLUMN IF NOT EXISTS view VARCHAR(100),
            ADD COLUMN IF NOT EXISTS county VARCHAR(255),
            ADD COLUMN IF NOT EXISTS water_source VARCHAR(100),
            ADD COLUMN IF NOT EXISTS new_construction BOOLEAN,
            ADD COLUMN IF NOT EXISTS pool BOOLEAN,
            ADD COLUMN IF NOT EXISTS pool_features VARCHAR(500),
            ADD COLUMN IF NOT EXISTS utilities JSON
        """))
        
        # Add email column to agents table
        await conn.execute(text("""
            ALTER TABLE agents 
            ADD COLUMN IF NOT EXISTS email VARCHAR(255)
        """))
        
        # Create tour_requests table
        print("Creating tour_requests table...")
        await conn.execute(text("""
            CREATE TABLE IF NOT EXISTS tour_requests (
                id SERIAL PRIMARY KEY,
                property_id INTEGER NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
                visitor_name VARCHAR(255) NOT NULL,
                visitor_email VARCHAR(255) NOT NULL,
                visitor_phone VARCHAR(50),
                preferred_date TIMESTAMP WITH TIME ZONE NOT NULL,
                preferred_time VARCHAR(50) NOT NULL,
                message TEXT,
                status VARCHAR(50) DEFAULT 'pending',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            )
        """))
        
        # Create mortgage_inquiries table
        print("Creating mortgage_inquiries table...")
        await conn.execute(text("""
            CREATE TABLE IF NOT EXISTS mortgage_inquiries (
                id SERIAL PRIMARY KEY,
                property_id INTEGER REFERENCES properties(id) ON DELETE SET NULL,
                inquirer_name VARCHAR(255) NOT NULL,
                inquirer_email VARCHAR(255) NOT NULL,
                inquirer_phone VARCHAR(50),
                content_sum_insured VARCHAR(100) NOT NULL,
                location VARCHAR(255) NOT NULL,
                age INTEGER NOT NULL,
                message TEXT,
                status VARCHAR(50) DEFAULT 'pending',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            )
        """))
        
        print("Database migration completed successfully!")


if __name__ == "__main__":
    asyncio.run(migrate_database())
