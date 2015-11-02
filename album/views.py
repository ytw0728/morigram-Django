from django.shortcuts import render
from django.http.response import HttpResponse
from django.db.models import Q
from django.contrib.auth.decorators import login_required

from os import *
from album.models import Album, Image


@login_required
def album(reqeust):
    return render(reqeust, 'album.html')

"""
from rest_framework.views import APIView
from rest_framework.response import Response

from django.views.generic import View

def album(request, current_dir):
    base_url = '/static/album/{user}/'.format(user=request.user)
    dirs = []
    for obj in listdir(STATIC_ROOT):
        if path.isdir(obj):
            dirs.append(obj)


def jsonify(lst, status):
    from json import dumps
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

class AlbumView(View):
    def get(self, req, path):
        sub_dirs = get_sub_dir(path)


        return jsonify()

    def post(self, path):
        pass

    def put(self, path):
        pass

    def delete(self, path):
        pass
"""
