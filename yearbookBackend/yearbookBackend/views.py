from rest_framework import viewsets, filters, generics, status
from rest_framework.decorators import action, api_view
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import GallerySerializer, MugshotsSerializer, HomepageSlideSerializer
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Image, Students, Mugshot, HomepageSlide, Gallery
from .serializers import ImageSerializer, StudentsSerializer
from django.shortcuts import get_object_or_404


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    parser_classes = (MultiPartParser, FormParser)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def perform_create(self, serializer):
        serializer.save()

class StudentsViewSet(viewsets.ModelViewSet):
    queryset = Students.objects.all()
    serializer_class = StudentsSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()



class MugshotsViewSet(viewsets.ModelViewSet):
    queryset = Mugshot.objects.all()
    serializer_class = MugshotsSerializer
    parser_classes = [MultiPartParser, FormParser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name', 'created_at']
    ordering = ['name']
    
    @action(detail=False, methods=['get'])
    def random(self, request):
        """Get random mugshots for display"""
        count = int(request.query_params.get('count', 6))
        random_mugshots = Mugshot.objects.order_by('?')[:count]
        serializer = self.get_serializer(random_mugshots, many=True)
        return Response(serializer.data)




class GalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    parser_classes = [MultiPartParser, FormParser]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']
    
    @action(detail=False, methods=['get'])
    def random(self, request):
        """Get random gallery items"""
        count = int(request.query_params.get('count', 10))
        random_items = Gallery.objects.order_by('?')[:count]
        serializer = self.get_serializer(random_items, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def images(self, request):
        """Get only images"""
        images = Gallery.objects.filter(media_type='image')
        serializer = self.get_serializer(images, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def videos(self, request):
        """Get only videos"""
        videos = Gallery.objects.filter(media_type='video')
        serializer = self.get_serializer(videos, many=True)
        return Response(serializer.data)

class HomepageSlideViewSet(viewsets.ModelViewSet):
    queryset = HomepageSlide.objects.filter(is_active=True)
    serializer_class = HomepageSlideSerializer
    parser_classes = [MultiPartParser, FormParser]
    
    @action(detail=False, methods=['get'])
    def active_slides(self, request):
        """Get only active slides ordered by order field"""
        slides = HomepageSlide.objects.filter(is_active=True).order_by('order', 'created_at')
        serializer = self.get_serializer(slides, many=True)
        return Response(serializer.data)
