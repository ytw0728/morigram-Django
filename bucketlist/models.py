from django.db import models
from account.models import Family


class BucketList(models.Model):
    family = models.ForeignKey(Family)
    title = models.CharField(max_length=255)
    image = models.ImageField(blank=True)

    def __str__(self):
        return "{}".format(self.title)
