from rest_framework import serializers
from .models import Image



class ImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Image
        fields = ('id', 'title', 'caption', 'image', 'alt_text', 'image_url')
        read_only_fields = ['image_url']

    
    def get_image_url(self, obj):
        return obj.image.url