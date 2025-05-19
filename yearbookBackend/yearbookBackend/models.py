from django.db import models


class Photo(models.Model):
    """A yearbook photo with caption"""
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='yearbook_photos/')
    caption = models.TextField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0, help_text="Display order in the slideshow")
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['order']
