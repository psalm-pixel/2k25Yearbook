#!/usr/bin/env python
"""
Populate sample homepage slides data
"""
import os
import django
import sys

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'yearbookBackend.settings')
django.setup()

from yearbookBackend.models import HomepageSlide

def create_sample_slides():
    """Create sample homepage slides with external image URLs"""
    
    # Clear existing slides
    HomepageSlide.objects.all().delete()
    print("Cleared existing homepage slides")
    
    slides_data = [
        {
            'title': 'Graduation Day Celebrations',
            'description': 'The joy and pride of our graduating class captured in this unforgettable moment',
            'image_url': 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'order': 1,
            'is_active': True
        },
        {
            'title': 'Academic Excellence Awards',
            'description': 'Celebrating outstanding achievements and dedication to learning',
            'image_url': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'order': 2,
            'is_active': True
        },
        {
            'title': 'Final Year Project Presentations',
            'description': 'Students showcasing their innovative projects and research',
            'image_url': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'order': 3,
            'is_active': True
        },
        {
            'title': 'Class Farewell Moments',
            'description': 'Cherishing the final moments together as a class',
            'image_url': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'order': 4,
            'is_active': True
        },
        {
            'title': 'Sports Day Championships',
            'description': 'Athletic achievements and team spirit at its finest',
            'image_url': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'order': 5,
            'is_active': True
        },
        {
            'title': 'Cultural Events & Performances',
            'description': 'Showcasing our diverse talents and cultural heritage',
            'image_url': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'order': 6,
            'is_active': True
        }
    ]
    
    created_slides = []
    for slide_data in slides_data:
        # For demonstration, we'll store the image URL directly
        # In production, you'd want to upload to Cloudinary
        slide = HomepageSlide.objects.create(
            title=slide_data['title'],
            description=slide_data['description'],
            # We'll store the external URL in the image field as a string
            # This is a workaround - in production you'd upload to Cloudinary
            image=slide_data['image_url'],
            order=slide_data['order'],
            is_active=slide_data['is_active']
        )
        created_slides.append(slide)
        print(f"Created slide: {slide.title}")
    
    print(f"\nSuccessfully created {len(created_slides)} homepage slides!")
    print("\nHomepage slides:")
    for slide in created_slides:
        print(f"- {slide.title} (Order: {slide.order})")
    
    return created_slides

if __name__ == '__main__':
    try:
        create_sample_slides()
        print("\n✅ Homepage slides population completed successfully!")
    except Exception as e:
        print(f"❌ Error creating homepage slides: {e}")
        sys.exit(1)
