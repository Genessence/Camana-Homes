#!/usr/bin/env python3
"""
Simple test to check imports and basic FastAPI functionality
"""

try:
    print("Testing imports...")
    from fastapi import FastAPI
    print("✅ FastAPI imported successfully")
    
    from db import SessionLocal, engine
    print("✅ Database modules imported successfully")
    
    from models import Base
    print("✅ Models imported successfully")
    
    from schemas import HeroSlideOut
    print("✅ Schemas imported successfully")
    
    # Create a simple app
    app = FastAPI(title="Test API")
    
    @app.get("/test")
    async def test():
        return {"message": "Hello World"}
    
    print("✅ FastAPI app created successfully")
    print("✅ All imports working!")
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
