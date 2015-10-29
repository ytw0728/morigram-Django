from django.db import models
from django.contrib.auth.models import User 

class Family(models.Model):
    user = models.OneToOneField(User)
    family_motto = models.CharField(max_length=255)

