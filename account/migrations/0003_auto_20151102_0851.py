# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_familymember'),
    ]

    operations = [
        migrations.AlterField(
            model_name='familymember',
            name='profile_image',
            field=models.ImageField(upload_to='', default='/home/nero/morigram-Django/static/images/morigram_bucket.png'),
        ),
    ]
