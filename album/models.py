from django.db import models
from account.models import Family
from django.core.files.storage import FileSystemStorage
from django.conf import settings

fs = FileSystemStorage(location='/static/albums/')


class Album(models.Model):
    family = models.ForeignKey(Family)
    title = models.CharField(max_length=255, null=False)
    parent_album = models.ForeignKey('self', related_name='dirs', null=True)
    memo = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title
    @property
    def path(self):
        from os.path import join
        from os import walk
        myalbum = '{}/'.format(settings.MEDIA_ROOT)
        
        for (path, _dir, files) in walk(myalbum):
            for d in _dir:
                if d == self.title:
                    return join(path,d)

    def get_album_url(self):
        album = None
        path = ''
        path_list = []
        while True:
            try:
                album = self.parent_album.parent_album
                path_list.append(album)
            except AttributeError:
                break

        for _dir in path_list.reverse():
            path += _dir+'/'

        return path


def get_upload_path(instunce, filename):
    from os.path import join
    
    #print(instunce.album.path, instunce.album.title, filename)
    return join(instunce.album.path, filename)


class Image(models.Model):
    album = models.ForeignKey(Album, related_name='images')
    image = models.ImageField(upload_to=get_upload_path)
    @property
    def get_absolute_image_url(self):
        return self.image.url.replace("/home/morigram/morigram-Django/media/",'')