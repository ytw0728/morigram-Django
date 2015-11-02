from django.db import models
from django.contrib.auth.models import User 

class Family(models.Model):
    user = models.OneToOneField(User)
    family_motto = models.CharField(max_length=255)
    
    def __str__(self):
        return self.user.username

class FamilyMember(models.Model):
    family = models.ForeignKey(Family, related_name='members')
    position = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    profile_image = models.ImageField(default='/home/nero/morigram-Django/static/images/morigram_bucket.png')

    def __str__(self):
        return '%s %s %s' % (self.family.user.username,self.position, self.name)
