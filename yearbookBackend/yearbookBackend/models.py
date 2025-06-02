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

class PrefectQuote(models.Model):
    # Foreign key to link to the existing student
    student = models.ForeignKey(Students, on_delete=models.CASCADE, related_name='prefect_quotes')
    role = models.CharField(max_length=100)  # e.g., "Head Prefect", "Sports Prefect", etc.
    quote = models.TextField()
    
    class Meta:
        verbose_name = "Prefect Quote"
        verbose_name_plural = "Prefect Quotes"
    
    def __str__(self):
        return f"{self.student.name} - {self.role}"
    
    @property
    def student_name(self):
        """Easy access to student name"""
        return self.student.name
    
    @property
    def student_image(self):
        """Easy access to student image"""
        return self.student.image
    

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