from django.db import models
from django.contrib.auth.models import AbstractUser

def imagePath(instance, filename):
    return 'images/{}/{}'.format(instance.user_id, filename)

class CustomUser(AbstractUser):
    pass

class Album(models.Model):
    user = models.ForeignKey(CustomUser, related_name='albums', on_delete=models.CASCADE)
    title = models.CharField(max_length=255, blank=True)

    @property
    def quantity(self):
        return None

    @property
    def warmth(self):
        return None

    @property
    def sharpness(self):
        return None

    class Meta:
        unique_together = ('user', 'title')

class Photo(models.Model):
    user = models.ForeignKey(CustomUser, related_name='photos', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=imagePath)
