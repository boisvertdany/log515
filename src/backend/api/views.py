from django.shortcuts import render

# Create your views here.

from rest_framework import generics

from api import models
from . import serializers

class ListAlbum(generics.ListCreateAPIView):
    queryset = models.Album.objects.all()
    serializer_class = serializers.AlbumSerializer

class DetailAlbum(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Album.objects.all()
    serializer_class = serializers.AlbumSerializer
