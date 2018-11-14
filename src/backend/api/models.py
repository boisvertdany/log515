from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    note = models.CharField(blank=True, max_length=255)

class Album(models.Model):
    user = models.ForeignKey(CustomUser, related_name='albums', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)

    #class Meta:
    #    order_by = 'title'