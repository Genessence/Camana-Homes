#!/usr/bin/env python3
"""
Test script for the new properties API endpoint
"""

import asyncio
import httpx
import json

async def test_properties_api():
    """Test the properties API endpoint"""
    async with httpx.AsyncClient() as client:
        try:
            # Test health endpoint first
            print("🔍 Testing API health...")
            health_response = await client.get("http://localhost:8000/api/health")
            print(f"Health status: {health_response.status_code}")
            
            if health_response.status_code == 200:
                print("✅ API is running")
                
                # Test properties endpoint
                print("\n🔍 Testing properties endpoint...")
                properties_response = await client.get(
                    "http://localhost:8000/api/properties",
                    params={"page": 1, "limit": 5}
                )
                
                print(f"Properties status: {properties_response.status_code}")
                
                if properties_response.status_code == 200:
                    data = properties_response.json()
                    print("✅ Properties endpoint working!")
                    print(f"📊 Found {len(data.get('properties', []))} properties")
                    print(f"📄 Total count: {data.get('pagination', {}).get('total_count', 0)}")
                    
                    # Show first property if exists
                    properties = data.get('properties', [])
                    if properties:
                        first_prop = properties[0]
                        print(f"\n🏠 Sample Property:")
                        print(f"  Title: {first_prop.get('title')}")
                        print(f"  Price: {first_prop.get('price_currency')} {first_prop.get('price_amount')}")
                        print(f"  Location: {first_prop.get('location_label')}")
                        print(f"  Bedrooms: {first_prop.get('bedrooms')}")
                        print(f"  Views: {first_prop.get('views_count')}")
                else:
                    print(f"❌ Properties endpoint failed: {properties_response.text}")
            else:
                print(f"❌ API health check failed: {health_response.status_code}")
                
        except Exception as e:
            print(f"❌ Error testing API: {e}")

if __name__ == "__main__":
    asyncio.run(test_properties_api())
