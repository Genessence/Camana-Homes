#!/usr/bin/env python3
"""
Test Backend API Endpoints
"""

import requests
import json

def test_api():
    """Test the backend API endpoints"""
    base_url = "http://localhost:8000"
    
    print("🧪 Testing Backend API...")
    print("=" * 40)
    
    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/api/health")
        print(f"✅ Health check: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return
    
    # Test trending properties
    try:
        response = requests.get(f"{base_url}/api/properties/trending?limit=3")
        print(f"✅ Trending properties: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Found {len(data)} properties")
            for prop in data:
                print(f"   - {prop.get('title', 'No title')} (${prop.get('price_amount', 0):,.0f})")
        else:
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"❌ Trending properties failed: {e}")
    
    # Test hero slides
    try:
        response = requests.get(f"{base_url}/api/hero-slides")
        print(f"✅ Hero slides: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Found {len(data)} slides")
        else:
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"❌ Hero slides failed: {e}")
    
    # Test articles
    try:
        response = requests.get(f"{base_url}/api/articles?limit=3")
        print(f"✅ Articles: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Found {len(data)} articles")
        else:
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"❌ Articles failed: {e}")

if __name__ == "__main__":
    test_api()
