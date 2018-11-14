from rest_framework import serializers
from . import models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ('email', 'username', 'note')

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Album
        fields = ('id', 'title')
