# 9. admin.py (images app)
from django.contrib import admin
from .models import Image

admin.site.register(Image)