# 9. admin.py (images app)
from django.contrib import admin
from .models import Image, Students, Gallery, Mugshot, HomepageSlide



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

@admin.register(Mugshot)
class MugshotsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'get_photo_preview', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name',)
    readonly_fields = ('created_at', 'get_photo_preview')
    fields = ('name', 'photo', 'get_photo_preview', 'created_at')
    
    def get_photo_preview(self, obj):
        if obj.photo:
            from django.utils.html import format_html
            return format_html('<img src="{}" width="100" height="130" style="object-fit: cover; border-radius: 8px;"/>', obj.photo.url)
        return "No photo"
    get_photo_preview.short_description = 'Photo Preview'


@admin.register(HomepageSlide)
class HomepageSlideAdmin(admin.ModelAdmin):
    list_display = ['title', 'get_image_preview', 'order', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['order', 'is_active']
    ordering = ['order', 'created_at']
    readonly_fields = ('get_image_preview', 'created_at')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'order', 'is_active')
        }),
        ('Image', {
            'fields': ('image', 'get_image_preview')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    def get_image_preview(self, obj):
        if obj.image:
            from django.utils.html import format_html
            return format_html('<img src="{}" width="200" height="120" style="object-fit: cover; border-radius: 8px;"/>', obj.image.url)
        return "No image uploaded"
    get_image_preview.short_description = 'Image Preview'
