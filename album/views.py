from django.http.response import HttpResponse
from django.shortcuts import render
from django.conf import settings
from os import makedirs

from json import loads, dumps
from album.models import Album, Image
from account.models import Family

"""
@login_required
def album(reqeust):
    return render(reqeust, 'album.html')
"""

from django.core import serializers

from django.views.generic import View


def jsonify(lst, status):
    return HttpResponse(dumps(lst), content_type='json', status=status)


def get_current_album_obj(path):
    pathes = path.split('/')
    for _dir in pathes:
        try:
            album = Album.objects.get(title=_dir)
        except Album.DoesNotExist:
            return jsonify([{'message': 'No such Album'}], 404)

        if album.title == pathes[-1]:
            break
        else:
            continue


def album_render(req, *args, **kwargs):
    return render(req, 'album.html')


class AlbumView(View):

    def get(self, req, *args, **kwargs):
        family = Family.objects.get(user=req.user)
        data = {}
        _path = req.path.replace("/album/", '/media/{}/'.format(req.user.username))
        path_list = list(filter(None, _path.split("/")))

        try:
            album = Album.objects.get(title=path_list[-1])
            images = [('/media/'+image.image.file.name.split('\\')[-1]) for image in album.images.all()]
            albums = [(_path+albums.title) \
                  for albums in album.dirs.all()]

        except Album.DoesNotExist:
            albums = None
            images = None
        data['images'] = images
        data['albums'] = albums
        lst = []
        lst.append(data)
        return jsonify(lst, 200)

    def post(self, req):
        lst = []
        data = {'is_success': False}
        _path = req.path.replace("/album/", '')
        path_list = list(filter(None, _path.split("/")))
        family = Family.objects.get(user=req.user)

        if req.FILES.get('file'):
            #filename = req.FILES['file'].name
            album_title = path_list[-1]

            try:
                album = Album.objects.get(title=album_title)

            except Album.DoesNotExist:
                data['message'] = 'Album Does not Exit.'
                lst.append(data)
                return jsonify(lst, 401)

            Image.objects.create(album=album, image=req.FILES['file'])
            data['is_success'] = True
            lst.append(data)
            return jsonify(lst, 201)

        else:  # mkdir
            album_title = req.POST['title']

            _dir = settings.MEDIA_ROOT+"/{user}/{album}".\
                format(user=req.user.username, album=_path)
            try:
                makedirs(_dir)
                data['is_success'] = True
                try:
                    parent = Album.objects.get(title=path_list[-1])
                except IndexError:
                    parent = None

                Album.objects.create(family=family, title=album_title, parent_album=parent)
            except FileExistsError:
                data['is_success'] = False
                data['message'] = 'Album Existed.'
                pass

            data['title'] = 'china'
            lst.append(data)
            return jsonify(lst, 401)
