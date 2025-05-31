# 9. admin.py (images app)
from django.contrib import admin
from .models import Image
from .models import Students


admin.site.register(Image)
admin.site.register(Students)