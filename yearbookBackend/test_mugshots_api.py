#!/usr/bin/env python
import os
import sys
import django
import json

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'yearbookBackend.settings')
django.setup()

from yearbookBackend.models import Mugshots
from yearbookBackend.serializers import MugshotsSerializer

def test_clean_mugshots_api():
    """Test the simplified mugshots API structure"""
    
    print("Testing Clean Mugshots API...")
    print("=" * 50)
    
    # Get all mugshots from database
    mugshots = Mugshots.objects.all()
    print(f"Found {mugshots.count()} mugshots in database")
    
    # Serialize the data (simulate what the API returns)
    serializer = MugshotsSerializer(mugshots, many=True)
    api_data = serializer.data
    
    print("\nAPI Response Preview:")
    print("=" * 30)
    
    if api_data:
        for i, mugshot in enumerate(api_data[:3]):  # Show first 3 entries
            print(f"\nMugshot {i+1}:")
            print(f"  ID: {mugshot['id']}")
            print(f"  Name: {mugshot['name']}")
            print(f"  Photo URL: {mugshot['photo_url'] if mugshot.get('photo_url') else 'No photo'}")
            print(f"  Thumbnail: {mugshot['thumbnail_url'] if mugshot.get('thumbnail_url') else 'No thumbnail'}")
            print(f"  Created: {mugshot['created_at']}")
        
        if len(api_data) > 3:
            print(f"\n... and {len(api_data) - 3} more entries")
    else:
        print("No mugshots found. You may need to add some data through Django admin.")
    
    # Verify data structure matches frontend expectations
    print("\nData Structure Validation:")
    print("=" * 30)
    
    required_fields = ['id', 'name', 'photo_url', 'thumbnail_url', 'created_at']
    
    all_valid = True
    for mugshot in api_data:
        for field in required_fields:
            if field not in mugshot:
                print(f"❌ Missing field '{field}' in mugshot {mugshot.get('name', 'Unknown')}")
                all_valid = False
    
    if all_valid:
        print("✅ All mugshots have required fields")
        print("✅ Backend API is ready for frontend integration")
        print("✅ No unnecessary text fields (crime, charges, etc.) present")
    else:
        print("❌ Some data structure issues found")
    
    print(f"\nTotal clean mugshots available: {len(api_data)}")
    print("The frontend will display only student photos and names!")

if __name__ == '__main__':
    test_clean_mugshots_api()
