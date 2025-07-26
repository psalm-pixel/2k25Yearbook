#!/usr/bin/env python
"""
Populate sample mugshots data for the yearbook
"""
import os
import django
import sys

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'yearbookBackend.settings')
django.setup()

from yearbookBackend.models import Mugshot

def create_sample_mugshots():
    """Create sample mugshots with external image URLs"""
    
    # Clear existing mugshots
    Mugshot.objects.all().delete()
    print("Cleared existing mugshots")
    
    # Sample student data with high-quality portrait images
    students_data = [
        {
            'name': 'Alex Johnson',
            'photo_url': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        },
        {
            'name': 'Sarah Williams',
            'photo_url': 'https://images.unsplash.com/photo-1494790108755-2616b612b0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        },
        {
            'name': 'Michael Chen',
            'photo_url': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        },
        {
            'name': 'Emily Davis',
            'photo_url': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        },
        {
            'name': 'David Brown',
            'photo_url': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        },
        {
            'name': 'Jessica Garcia',
            'photo_url': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        },
        {
            'name': 'Christopher Lee',
            'photo_url': 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        },
        {
            'name': 'Amanda Rodriguez',
            'photo_url': 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        },
        {
            'name': 'Ryan Martinez',
            'photo_url': 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        },
        {
            'name': 'Rachel Thompson',
            'photo_url': 'https://images.unsplash.com/photo-1467632499275-7a693a761056?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        },
        {
            'name': 'Kevin Anderson',
            'photo_url': 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        },
        {
            'name': 'Lauren Wilson',
            'photo_url': 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        },
        {
            'name': 'Jordan Taylor',
            'photo_url': 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        },
        {
            'name': 'Megan Clark',
            'photo_url': 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        },
        {
            'name': 'Tyler White',
            'photo_url': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        },
        {
            'name': 'Ashley Moore',
            'photo_url': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        },
        {
            'name': 'Brandon Jackson',
            'photo_url': 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        },
        {
            'name': 'Stephanie Lewis',
            'photo_url': 'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        },
        {
            'name': 'Daniel Hall',
            'photo_url': 'https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        },
        {
            'name': 'Nicole Allen',
            'photo_url': 'https://images.unsplash.com/photo-1541823709867-1b206113eafd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80'
        }
    ]
    
    created_mugshots = []
    for student_data in students_data:
        # For this demo, we'll store the external URL directly in the photo field
        # In production, you'd want to upload to Cloudinary
        mugshot = Mugshot.objects.create(
            name=student_data['name'],
            # Store the external URL directly - the model will handle it
            photo=student_data['photo_url']
        )
        created_mugshots.append(mugshot)
        print(f"Created mugshot for: {mugshot.name}")
    
    print(f"\nSuccessfully created {len(created_mugshots)} mugshots!")
    print("\nMugshots created:")
    for mugshot in created_mugshots:
        print(f"- {mugshot.name}")
    
    return created_mugshots

if __name__ == '__main__':
    try:
        create_sample_mugshots()
        print("\n✅ Mugshots population completed successfully!")
        print("\nYou can now access the mugshots via:")
        print("- API: http://localhost:8000/mugshots/")
        print("- Admin: http://localhost:8000/admin/")
        print("- Frontend: Navigate to the mugshots page")
    except Exception as e:
        print(f"❌ Error creating mugshots: {e}")
        sys.exit(1)
