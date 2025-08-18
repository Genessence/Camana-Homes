import asyncio
import aiohttp
import json

async def test_endpoints():
    """Test if the backend endpoints are working"""
    base_url = "http://localhost:8000"
    
    async with aiohttp.ClientSession() as session:
        try:
            # Test health endpoint
            print("Testing health endpoint...")
            async with session.get(f"{base_url}/api/health") as response:
                if response.status == 200:
                    print("✅ Health endpoint working")
                else:
                    print(f"❌ Health endpoint failed: {response.status}")
            
            # Test trending endpoint
            print("Testing trending endpoint...")
            async with session.get(f"{base_url}/api/properties/trending?limit=3") as response:
                if response.status == 200:
                    data = await response.json()
                    print(f"✅ Trending endpoint working: {len(data)} properties")
                else:
                    print(f"❌ Trending endpoint failed: {response.status}")
                    text = await response.text()
                    print(f"Response: {text}")
            
            # Test featured endpoint
            print("Testing featured endpoint...")
            async with session.get(f"{base_url}/api/properties/featured?limit=5") as response:
                if response.status == 200:
                    data = await response.json()
                    print(f"✅ Featured endpoint working: {len(data)} properties")
                else:
                    print(f"❌ Featured endpoint failed: {response.status}")
                    text = await response.text()
                    print(f"Response: {text}")
            
            # Test main properties endpoint
            print("Testing main properties endpoint...")
            async with session.get(f"{base_url}/api/properties?limit=3") as response:
                if response.status == 200:
                    data = await response.json()
                    print(f"✅ Main properties endpoint working: {len(data.get('properties', []))} properties")
                else:
                    print(f"❌ Main properties endpoint failed: {response.status}")
                    text = await response.text()
                    print(f"Response: {text}")
                    
        except Exception as e:
            print(f"❌ Error testing endpoints: {e}")

if __name__ == "__main__":
    asyncio.run(test_endpoints())
