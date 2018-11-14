from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    pass

class Album(models.Model):
    user = models.ForeignKey(CustomUser, related_name='albums', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
