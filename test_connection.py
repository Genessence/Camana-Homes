#!/usr/bin/env python3
"""
Test Database Connection
"""

import asyncio
from sqlalchemy import text
from api.db import engine


async def test_connection():
    """Test database connection"""
    print("Testing database connection...")
    
    try:
        async with engine.begin() as conn:
            result = await conn.execute(text("SELECT 1"))
            print("✅ Database connection successful!")
            return True
            
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False


if __name__ == "__main__":
    asyncio.run(test_connection())
