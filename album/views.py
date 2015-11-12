from django.http.response import HttpResponse
from django.shortcuts import render, redirect
from django.conf import settings
from os import makedirs
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from json import loads, dumps
from album.models import Album, Image
from account.models import Family
from os import *
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

def thumbnail(req):
    family = Family.objects.get(user=req.user)
    albums = Album.objects.filter(family=family)
    res = []
    for al in albums:
        for img in al.images.all():
            data = {}
            data['img'] = img.image.file.url
            res.append(data)

    return jsonify(res,200)

def album_render(req, *args, **kwargs):
    return render(req, 'album.html')

@login_required
@csrf_exempt
def album_view(req, **kwargs):
    if req.method == 'GET':
        family = Family.objects.get(user=req.user)
        data = {}
        _path = req.path#.replace("/api/album/", '/media/{}/'.format(req.user.username))
        path_list = list(filter(None, _path.split("/")))
        print(path_list)

        try:
            album = Album.objects.get(title=path_list[-1])
        except Album.DoesNotExist:
            album = Album.objects.get(title=req.user.username)

        img_data = [('/media/'+image.get_absolute_image_url,
            image.get_absolute_image_url.split('/')[-1]
            ) for image in album.images.all()]
        album_data = [(_path+albums.title,albums.title) \
                  for albums in album.dirs.all()]

        data['files'] = []
        for path,name in img_data:
            data['files'].append({'path': path, 'name': name})

        data['folders'] = []
        for path, title in album_data:
            data['folders'].append({'path': path+'/', 'title':title})

        data['memo'] = album.memo
        if len(data['memo']) == 0:
            data['memo'] = None
            
        try:
            data['parent_folder'] = album.parent_album.path.replace("/home/morigram/morigram-Django/media/{}".\
                format(req.user.username),'/api/album/')
        except AttributeError:
            data['parent_folder'] = None
        lst = []
        lst.append(data)
        print(lst)
        return jsonify(lst, 200)

    else:
        lst = []
        data = {'is_success': False}
        _path = req.path.replace("/api/album/", '')
        path_list = list(filter(None, _path.split("/")))
        family = Family.objects.get(user=req.user)

        if req.FILES.get('img'):
            #filename = req.FILES['file'].name
            try:
                album_title = path_list[-1]
            except:
                album_title = req.user.username
            try:
                album = Album.objects.get(title=album_title)

            except Album.DoesNotExist:
                data['message'] = 'Album Does not Exit.'
                lst.append(data)
                return jsonify(lst, 401)

            Image.objects.create(album=album, image=req.FILES['img'])
            data['is_success'] = True
            lst.append(data)
            return redirect('/album/')

        else:  # mkdir
            album_title = req.POST['title']
            _dir = settings.MEDIA_ROOT+"/{user}/{album}/{title}".\
                format(user=req.user.username, album=_path, title=album_title)
            try:
                makedirs(_dir)
                data['is_success'] = True
                print(_path, _dir)
                try:
                    parent = Album.objects.get(title=path_list[-1])
                except IndexError:
                    parent = Album.objects.get(title=req.user.username)
                except Album.DoesNotExist:
                    return jsonify([], 401)
                Album.objects.create(family=family, title=album_title, memo=req.POST['memo'], parent_album=parent)
            except OSError:
                data['is_success'] = False
                data['message'] = 'Album Existed.'
                lst.append(data)
                return jsonify(lst, 200)
            lst.append(data)
            return redirect('/album/')
