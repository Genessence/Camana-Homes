#!/usr/bin/env python3
"""
Simple Database Setup Script for Camana Homes

This script creates the database tables directly without Alembic.
"""

import asyncio
import os
from api.models import Base
from api.db import engine


async def setup_database():
    """Set up the database tables"""
    print("Setting up database...")
    
    try:
        # Create all tables
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print("✅ Database tables created successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Error creating tables: {e}")
        return False


async def test_connection():
    """Test database connection"""
    print("Testing database connection...")
    
    try:
        async with engine.begin() as conn:
            from sqlalchemy import text
            result = await conn.execute(text("SELECT 1"))
            print("✅ Database connection successful!")
            return True
            
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False


async def main():
    """Main setup function"""
    print("Camana Homes - Simple Database Setup")
    print("=" * 40)
    
    # Test connection first
    if not await test_connection():
        print("\n❌ Cannot connect to database. Please check:")
        print("1. Docker container is running: docker start camana_homes_db")
        print("2. Database credentials in .env file")
        print("3. Port 5432 is available")
        return
    
    # Set up tables
    if await setup_database():
        print("\n🎉 Database setup completed successfully!")
        print("\nNext steps:")
        print("1. Run: python setup_image_folders.py")
        print("2. Add your property images to the created folders")
        print("3. Run: python import_excel.py")
        print("4. Start API: cd api && uvicorn main:app --reload --port 8001")
    else:
        print("\n❌ Database setup failed!")


if __name__ == "__main__":
    asyncio.run(main())
