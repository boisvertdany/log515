from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from . import models
from . import serializers
from .album_creation_helper import createAlbum
from src.analysis.choose import Warmth

import random

def setAlbumUri(data, request):
    album_uri = '{}/media/albums/{}/{}.pdf'.format(
        request.build_absolute_uri()[:-len(request.get_full_path())],
        request.user.id,
        data['title'].replace(' ', '%20')
    )
    data['album'] = album_uri
    return data

def setAlbumsUri(data, request):
    for album in data:
        setAlbumUri(album, request)
    return data

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

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(setAlbumsUri(serializer.data, request))

    def perform_create(self, serializer):
        title_get = serializer.validated_data.get('title')
        if title_get == '':
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
        return album

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        album = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        data = serializer.data
        data['id'] = album.id
        data['title'] = album.title
        return Response(setAlbumUri(data, request), status=status.HTTP_201_CREATED, headers=headers)

class DetailAlbum(generics.RetrieveDestroyAPIView):
    queryset = models.Album.objects.all()
    serializer_class = serializers.AlbumSerializer

    def get_queryset(self):
        return models.Album.objects.filter(user_id=self.request.user.id)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(setAlbumUri(serializer.data, request))

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
        return photo

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        photo = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        data = serializer.data
        data['id'] = photo.id
        photo_uri = '{}/media/{}'.format(
            request.build_absolute_uri()[:-len(request.get_full_path())],
            photo.image
        )
        data['image'] = photo_uri
        return Response(data, status=status.HTTP_201_CREATED, headers=headers)

class DetailPhoto(generics.RetrieveDestroyAPIView):
    queryset = models.Photo.objects.all()
    serializer_class = serializers.PhotoSerializer

    def get_queryset(self):
        return models.Photo.objects.filter(user_id=self.request.user.id)
