#!/usr/bin/env python
"""
Test script to create a sample mugshot entry
"""
import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'yearbookBackend.settings')
django.setup()

from yearbookBackend.models import Mugshot

def create_test_mugshot():
    """Create a test mugshot entry"""
    
    print("🧪 Creating Test Mugshot Entry")
    print("=" * 40)
    
    # Create a test entry without a photo first
    test_mugshot = Mugshot.objects.create(
        name="Test Student",
        # We'll leave photo empty for now since we need actual file upload
    )
    
    print(f"✅ Created test mugshot: {test_mugshot.name}")
    print(f"   ID: {test_mugshot.id}")
    print(f"   Created: {test_mugshot.created_at}")
    
    print("\n📱 Now check your admin interface:")
    print("1. Go to: http://localhost:8000/admin/")
    print("2. Look for 'Student Photos' section")
    print("3. You should see 'Test Student' entry")
    print("4. Click on it to edit and add a photo")
    
    total_mugshots = Mugshot.objects.count()
    print(f"\n📊 Total mugshots in database: {total_mugshots}")
    
    return test_mugshot

if __name__ == '__main__':
    try:
        mugshot = create_test_mugshot()
        print("\n🎉 Test mugshot created successfully!")
        print("\nNow you should definitely see 'Student Photos' in your admin dashboard!")
    except Exception as e:
        print(f"❌ Error creating test mugshot: {e}")
