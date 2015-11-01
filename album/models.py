from django.db import models


class Album(models.Model):
    title = models.CharField(max_length=255)
    alt = models.CharField(max_length=255)
    parent_album = models.ForeignKey('Album')

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
    pass


class Image(models.Model):
    album = models.ForeignKey(Album, related_name='images')
    image = models.ImageField(upload_to=get_upload_path)
