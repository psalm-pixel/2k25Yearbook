from django.db import models
from cloudinary.models import CloudinaryField

class Image(models.Model):
    title = models.CharField(max_length=100)
    caption = models.TextField(blank=True)
    alt_text = models.CharField(max_length=100, blank=True)
    # This stores the Cloudinary image URL and handles the upload
    image = CloudinaryField('image')
    
    def __str__(self):
        return self.title