from django.db import models
from account.models import Family
from django.core.files.storage import FileSystemStorage
from django.conf import settings

fs = FileSystemStorage(location='/static/albums/')


class Album(models.Model):
    family = models.ForeignKey(Family)
    title = models.CharField(max_length=255)
    alt = models.CharField(max_length=255)
    parent_album = models.ForeignKey('self', related_name='dirs', null=True)
    
    @property
    def path(self):
        from os.path import join
        url = '{}/{}/'.format(settings.MEDIA_ROOT, self.family.user.username)
        album = self
        a = self.parent_album

        while(True):
            if a is None:
                break
            a = a.parent_album

        return url

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
    print(__name__)
    print(instunce, filename)
    return join(instunce.album.path, filename)


class Image(models.Model):
    album = models.ForeignKey(Album, related_name='images')
    image = models.ImageField(upload_to=get_upload_path)
