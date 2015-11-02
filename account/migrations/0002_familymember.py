# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='FamilyMember',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, verbose_name='ID', serialize=False)),
                ('position', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('profile_image', models.ImageField(upload_to='')),
                ('family', models.ForeignKey(to='account.Family', related_name='members')),
            ],
        ),
    ]
