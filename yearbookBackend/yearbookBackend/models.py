from django.db import models
from cloudinary.models import CloudinaryField
from cloudinary import CloudinaryImage

class Image(models.Model):
    title = models.CharField(max_length=100)
    caption = models.TextField(blank=True)
    alt_text = models.CharField(max_length=100, blank=True)
    # This stores the Cloudinary image URL and handles the upload
    image = CloudinaryField('image')
   
    def __str__(self):
        return self.title
   
class Students(models.Model):
    name = models.CharField(max_length=100)
    nickname = models.CharField(max_length=100, blank=True)
    image = CloudinaryField('students')
    quote = models.TextField(blank=True)
    favorite_sport = models.CharField(max_length=100, blank=True)
    hobbies = models.TextField(blank=True)
    ambitions = models.TextField(blank=True)
    
    def __str__(self):
        return self.name

    

class Mugshot(models.Model):
    name = models.CharField(max_length=100)
    photo = CloudinaryField('mugshots', folder="yearbook/mugshots")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'yearbookBackend_mugshots'  # Use existing plural table name
        verbose_name = "Student Photo"
        verbose_name_plural = "Student Photos"
        ordering = ['name']
    
    def __str__(self):
        return self.name
    
    @property
    def photo_url(self):
        """Get the photo URL"""
        if self.photo:
            return str(self.photo.url)
        return None
    
    @property
    def thumbnail_url(self):
        """Get thumbnail URL for the photo"""
        if self.photo:
            return CloudinaryImage(str(self.photo)).build_url(
                width=300, height=400, crop='fill', quality='auto'
            )
        return None

class Gallery(models.Model):
    MEDIA_TYPE_CHOICES = [
        ('image', 'Image'),
        ('video', 'Video'),
    ]
    
    title = models.CharField(max_length=200, blank=True)
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPE_CHOICES)
    
    # Cloudinary fields
    image = CloudinaryField(
        'image',
        blank=True,
        null=True,
        folder="yearbook/gallery"
    )
    
    video = CloudinaryField(
        'video',
        blank=True,
        null=True,
        folder="yearbook/gallery",
        resource_type="video"
    )
    
    class Meta:
        verbose_name = "Gallery Item"
        verbose_name_plural = "Gallery Items"
    
    def __str__(self):
        return self.title or f"{self.media_type.title()} Item"
    
    @property
    def media_url(self):
        """Get the main media URL"""
        if self.media_type == 'image' and self.image:
            return str(self.image.url)
        elif self.media_type == 'video' and self.video:
            return str(self.video.url)
        return None
    
    @property
    def thumbnail_url(self):
        """Get thumbnail URL"""
        if self.media_type == 'image' and self.image:
            return CloudinaryImage(str(self.image)).build_url(
                width=300, height=400, crop='fill', quality='auto'
            )
        elif self.media_type == 'video' and self.video:
            return CloudinaryImage(str(self.video)).build_url(
                resource_type='video', format='jpg',  # Force an image format
                width=300, height=400, crop='fill', start_offset='auto'
            )
        return None

class HomepageSlide(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    # Cloudinary field for image uploads
    image = CloudinaryField('slideshow', folder="yearbook/slideshow")
    order = models.PositiveIntegerField(default=0, help_text="Order of appearance in slideshow")
    is_active = models.BooleanField(default=True, help_text="Whether this slide is shown")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Homepage Slide"
        verbose_name_plural = "Homepage Slides"
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return self.title
    
    @property
    def image_url(self):
        """Get the image URL"""
        if self.image:
            return str(self.image.url)
        return None
    
    @property
    def optimized_image_url(self):
        """Get optimized image URL for slideshow"""
        if self.image:
            return CloudinaryImage(str(self.image)).build_url(
                width=1200, height=600, crop='fill', quality='auto', format='auto'
            )
        return None
