from rest_framework import serializers
from rest_framework import serializers
from .models import PrefectQuote, Students, Image, Gallery


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
    


class PrefectQuoteSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.name', read_only=True)
    student_image = serializers.ImageField(source='student.image', read_only=True)
    
    class Meta:
        model = PrefectQuote
        fields = ['id', 'student_name', 'student_image', 'role', 'quote']



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