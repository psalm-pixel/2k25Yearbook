from rest_framework import serializers
from .models import Students, Image, Gallery, Mugshot, HomepageSlide


class ImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Image
        fields = ('id', 'title', 'caption', 'image', 'alt_text', 'image_url',)
        read_only_fields = ['image_url']

    
    def get_image_url(self, obj):
        return obj.image.url
 
    
class StudentsSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Students
        fields = ('id', 'name', 'nickname', 'image', 'quote', 'favorite_sport', 'hobbies', 'ambitions', 'image_url', )
        read_only_fields = ['image_url']

    def get_image_url(self, obj):
        return obj.image.url
    


class MugshotsSerializer(serializers.ModelSerializer):
    photo_url = serializers.ReadOnlyField()
    thumbnail_url = serializers.ReadOnlyField()
    
    class Meta:
        model = Mugshot
        fields = [
            'id', 'name', 'photo', 'photo_url', 'thumbnail_url', 'created_at'
        ]
        read_only_fields = ['photo_url', 'thumbnail_url', 'created_at']
    
    def create(self, validated_data):
        """Handle photo upload during creation"""
        return Mugshot.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """Handle photo upload during update"""
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance




class GallerySerializer(serializers.ModelSerializer):
    media_url = serializers.ReadOnlyField()
    thumbnail_url = serializers.ReadOnlyField()
    
    class Meta:
        model = Gallery
        fields = [
            'id', 'title', 'media_type', 'image', 'video',
            'media_url', 'thumbnail_url'
        ]
    
    def validate(self, data):
        media_type = data.get('media_type')
        image = data.get('image')
        video = data.get('video')
        
        if media_type == 'image' and not image:
            raise serializers.ValidationError("Image is required when media type is 'image'.")
        if media_type == 'video' and not video:
            raise serializers.ValidationError("Video is required when media type is 'video'.")
        
        return data

class HomepageSlideSerializer(serializers.ModelSerializer):
    image_url = serializers.ReadOnlyField()
    optimized_image_url = serializers.ReadOnlyField()
    
    class Meta:
        model = HomepageSlide
        fields = [
            'id', 'title', 'description', 'image', 'image_url', 
            'optimized_image_url', 'order', 'is_active', 'created_at'
        ]
        read_only_fields = ['image_url', 'optimized_image_url', 'created_at']
    
    def create(self, validated_data):
        """Handle image upload during creation"""
        return HomepageSlide.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """Handle image upload during update"""
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
