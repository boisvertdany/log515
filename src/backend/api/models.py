from django.db import models
from django.contrib.auth.models import AbstractUser

def imagePath(instance, filename):
    return 'images/{}/{}'.format(instance.user_id, filename)

class CustomUser(AbstractUser):
    pass

class Album(models.Model):
    user = models.ForeignKey(CustomUser, related_name='albums', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)

class Photo(models.Model):
    user = models.ForeignKey(CustomUser, related_name='photos', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=imagePath)
