# Generated by Django 2.1.3 on 2018-11-14 16:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_album_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='note',
        ),
    ]