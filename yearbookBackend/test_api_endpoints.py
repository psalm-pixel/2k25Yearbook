#!/usr/bin/env python
"""
Test script to verify all API endpoints are working correctly
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_endpoint(endpoint, method='GET', data=None):
    """Test a single API endpoint"""
    url = f"{BASE_URL}{endpoint}"
    try:
        if method == 'GET':
            response = requests.get(url)
        elif method == 'POST':
            response = requests.post(url, json=data)
        
        print(f"✅ {method} {endpoint} - Status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            if isinstance(result, list):
                print(f"   Found {len(result)} items")
                if result:
                    print(f"   Sample item keys: {list(result[0].keys())}")
            elif isinstance(result, dict):
                print(f"   Response keys: {list(result.keys())}")
            return True
        else:
            print(f"   Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ {method} {endpoint} - Error: {e}")
        return False

def main():
    """Test all endpoints"""
    print("Testing Yearbook API Endpoints")
    print("=" * 50)
    
    endpoints = [
        '/students/',
        '/mugshots/',
        '/gallery/',
        '/homepage-slides/',
        '/homepage-slides/active_slides/',
        '/images/',
    ]
    
    passed = 0
    total = len(endpoints)
    
    for endpoint in endpoints:
        if test_endpoint(endpoint):
            passed += 1
        print()
    
    print(f"Results: {passed}/{total} endpoints working correctly")
    
    if passed == total:
        print("🎉 All API endpoints are working!")
    else:
        print("⚠️  Some endpoints need attention")

if __name__ == '__main__':
    main()
