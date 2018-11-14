from django.shortcuts import render
from rest_framework import generics

from . import models
from . import serializers

class UserListView(generics.ListCreateAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer

#TODO: RUD PI view for CustomUser

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
