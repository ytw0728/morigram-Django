# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import album.models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, auto_created=True, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('alt', models.CharField(max_length=255)),
                ('parent_album', models.ForeignKey(to='album.Album')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, auto_created=True, verbose_name='ID')),
                ('image', models.ImageField(upload_to=album.models.get_upload_path)),
                ('album', models.ForeignKey(related_name='images', to='album.Album')),
            ],
        ),
    ]
