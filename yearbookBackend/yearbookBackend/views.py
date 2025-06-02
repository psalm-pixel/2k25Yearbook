from rest_framework import viewsets, filters, generics, status
from rest_framework.decorators import action, api_view
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import GallerySerializer
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Image, Students
from .serializers import ImageSerializer, StudentsSerializer, PrefectQuoteSerializer
from django.shortcuts import get_object_or_404
from .models import PrefectQuote, Students, Gallery


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



class PrefectQuoteViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PrefectQuote.objects.select_related('student')
    serializer_class = PrefectQuoteSerializer



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