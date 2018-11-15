from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAdminUser

from . import models
from . import serializers
from .album_creation_helper import createAlbum
from src.analysis.choose import Warmth

import random

class ListUser(generics.ListCreateAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = (IsAdminUser,)

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
        title_get = serializer.validated_data.get('title')
        if title_get == "":
            title_get = random.choice(list(open('api/random_album_titles.txt'))).rstrip()

        createAlbum(
            '/{}'.format(self.request.user.id),
            title_get,
            serializer.validated_data.get('quantity'),
            serializer.validated_data.get('warmth'),
            serializer.validated_data.get('sharpness'),
            '/{}/{}.pdf'.format(self.request.user.id, title_get)
        )

        album = models.Album.objects.create(
            title = title_get,
            user_id = self.request.user.id
        )

        models.Photo.objects.filter(user_id=self.request.user.id).delete()

class DetailAlbum(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Album.objects.all()
    serializer_class = serializers.AlbumSerializer

    def get_queryset(self):
        return models.Album.objects.filter(user_id=self.request.user.id)

class ListPhoto(generics.ListCreateAPIView):
    queryset = models.Photo.objects.all()
    serializer_class = serializers.PhotoSerializer

    def get_queryset(self):
        return models.Photo.objects.filter(user_id=self.request.user.id)

    def perform_create(self, serializer):
        photo = models.Photo.objects.create(
            image = serializer.validated_data.get('image'),
            user_id = self.request.user.id
        )

class DetailPhoto(generics.RetrieveDestroyAPIView):
    queryset = models.Photo.objects.all()
    serializer_class = serializers.PhotoSerializer

    def get_queryset(self):
        return models.Photo.objects.filter(user_id=self.request.user.id)
