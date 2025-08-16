#!/usr/bin/env python3
"""
Test Backend Connection
"""

import requests
import time

def test_backend():
    """Test if the backend is running and responding"""
    print("🧪 Testing Backend Connection...")
    print("=" * 40)
    
    # Wait a moment for the server to start
    time.sleep(2)
    
    try:
        # Test health endpoint
        response = requests.get("http://localhost:8001/api/health", timeout=5)
        if response.status_code == 200:
            print("✅ Backend is running!")
            print(f"   Health check: {response.json()}")
            
            # Test hero slides endpoint
            response = requests.get("http://localhost:8001/api/hero-slides", timeout=5)
            if response.status_code == 200:
                slides = response.json()
                print(f"✅ Hero slides endpoint working! Found {len(slides)} slides")
            else:
                print(f"⚠️  Hero slides endpoint returned {response.status_code}")
                
        else:
            print(f"❌ Backend returned status {response.status_code}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend. Is it running?")
        print("   Try: cd api && uvicorn main:app --reload --host 0.0.0.0 --port 8001")
    except Exception as e:
        print(f"❌ Error testing backend: {e}")

if __name__ == "__main__":
    test_backend()
