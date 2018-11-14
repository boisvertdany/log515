from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import generics

from . import models
from . import serializers

class ListUser(generics.ListCreateAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer

class DetailUser(generics.RetrieveUpdateAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, id=self.request.user.id)
        return obj

class ListAlbum(generics.ListCreateAPIView):
    queryset = models.Album.objects.all()
    serializer_class = serializers.AlbumSerializer

    def get_queryset(self):
        return models.Album.objects.filter(user_id=self.request.user.id)

    def perform_create(self, serializer):
        album = models.Album.objects.create(
            title = serializer.validated_data.get('title'),
            user_id = self.request.user.id
        )

class DetailAlbum(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Album.objects.all()
    serializer_class = serializers.AlbumSerializer

    def get_queryset(self):
        return models.Album.objects.filter(user_id=self.request.user.id)
