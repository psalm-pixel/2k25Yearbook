from django.contrib import admin
from .models import Photo
from django.utils.html import format_html

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('title', 'thumbnail_preview', 'order')
    search_fields = ('title', 'caption')
    readonly_fields = ('thumbnail_preview',)
    
    def thumbnail_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="auto" />', obj.image.url)
        return "No Image"
    
    thumbnail_preview.short_description = 'Thumbnail'