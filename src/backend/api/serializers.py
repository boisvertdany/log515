from rest_framework import serializers
from . import models

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Album
        fields = ('id', 'title', 'user_id')

class UserSerializer(serializers.ModelSerializer):
    albums = AlbumSerializer(many=True)

    class Meta:
        model = models.CustomUser
        fields = ('email', 'username', 'note', 'albums')
