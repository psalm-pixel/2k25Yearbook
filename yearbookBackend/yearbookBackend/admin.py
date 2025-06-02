# 9. admin.py (images app)
from django.contrib import admin
from .models import Image, Students, PrefectQuote, Gallery



@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ['title', 'media_type']
    list_filter = ['media_type']
    search_fields = ['title']

# Keep your existing admin registrations
@admin.register(Students)
class StudentsAdmin(admin.ModelAdmin):
    list_display = ['name', 'nickname', 'favorite_sport']
    search_fields = ['name', 'nickname']

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'caption']
    search_fields = ['title', 'caption']

@admin.register(PrefectQuote)
class PrefectQuoteAdmin(admin.ModelAdmin):
    list_display = ['student', 'role']
    list_filter = ['role']