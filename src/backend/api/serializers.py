from rest_framework import serializers
from api import models

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'title',
        )
        model = models.Album
