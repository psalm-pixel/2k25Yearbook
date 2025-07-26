#!/usr/bin/env python
"""
Verify admin interface registration
"""
import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'yearbookBackend.settings')
django.setup()

from django.contrib import admin
from yearbookBackend.models import Mugshot, HomepageSlide, Students, Gallery, Image

def verify_admin_registration():
    """Verify all models are registered in admin"""
    
    print("🔍 Admin Interface Verification")
    print("=" * 50)
    
    models_to_check = [
        (Mugshot, "Student Photos (Mugshots)"),
        (HomepageSlide, "Homepage Slides"),
        (Students, "Students"),
        (Gallery, "Gallery"),
        (Image, "Images")
    ]
    
    print("Models that should appear in admin:")
    print()
    
    for model, display_name in models_to_check:
        is_registered = admin.site.is_registered(model)
        status = "✅ REGISTERED" if is_registered else "❌ NOT REGISTERED"
        
        print(f"{status} - {display_name}")
        print(f"  Model: {model.__name__}")
        print(f"  Verbose name: {model._meta.verbose_name}")
        print(f"  Verbose name plural: {model._meta.verbose_name_plural}")
        
        if is_registered:
            admin_class = admin.site._registry[model]
            print(f"  Admin class: {admin_class.__class__.__name__}")
        
        print()
    
    print("📊 Summary:")
    registered_count = sum(1 for model, _ in models_to_check if admin.site.is_registered(model))
    print(f"  {registered_count}/{len(models_to_check)} models registered")
    
    print("\n🌐 To access admin interface:")
    print("1. Start Django server: python manage.py runserver")
    print("2. Go to: http://localhost:8000/admin/")
    print("3. Login with superuser credentials")
    print("4. Look for these sections:")
    
    for model, display_name in models_to_check:
        if admin.site.is_registered(model):
            print(f"   - {model._meta.verbose_name_plural}")
    
    return registered_count == len(models_to_check)

if __name__ == '__main__':
    success = verify_admin_registration()
    if success:
        print("\n🎉 All models are properly registered!")
    else:
        print("\n⚠️  Some models are missing from admin interface")
