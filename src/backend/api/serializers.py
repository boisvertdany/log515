from rest_framework import serializers
from . import models

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Album
        fields = ('id', 'title')

class UserSerializer(serializers.ModelSerializer):
    albums = AlbumSerializer(many=True)

    class Meta:
        model = models.CustomUser
        fields = ('email', 'username', 'albums')
