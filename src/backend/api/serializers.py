from rest_framework import serializers
from . import models

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Photo
        fields = ('id', 'image')

class AlbumSerializer(serializers.ModelSerializer):
    quantity = serializers.IntegerField()
    warmth = serializers.CharField(max_length=255, allow_blank=True)
    sharpness = serializers.BooleanField()

    def get_quantity(self, obj):
        return None

    def get_warmth(self, obj):
        return None

    def get_sharpness(self, obj):
        return None

    class Meta:
        model = models.Album
        fields = ('id', 'title', 'quantity', 'warmth', 'sharpness')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ('id', 'email', 'username')
