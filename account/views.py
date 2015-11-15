#! -*- coding:utf-8 -*-
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as l, logout as lg
from django.contrib.auth.models import User
from account.models import Family
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from account.models import Family, FamilyMember
from album.models import Album
from os.path import join

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = request.POST
        try:
            user = User.objects.create_user(username=data['username'], password=data['password'])
        except:
            return render(request, 'register.html', {"message": u"회원가입에 실패했습니다. 다른 아이디로 시도해 주세요."})
        f = Family()
        f.user = user
        f.motto = data['motto']
        f.save()

        Album.objects.create(title=data['username'], parent_album=None, family=f)

        return render(request, 'login.html', {"message":u"회원가입 성공"})

    else:
        return render(request, 'register.html')

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = request.POST
        user = authenticate(username=data['username'], password=data['password'])
        if user is not None:
            l(request, user)
            return redirect('/')
        else:
            return render(request, 'login.html', {'message': u'아이디 또는 비밀번호를 확인해주세요!'})
    else:
        return render(request, 'login.html')

@csrf_exempt
def logout(request):
    lg(request)
    return redirect('/')

@login_required
@csrf_exempt
def setting(request):
    if request.method == 'GET':
        pass    
    f = Family.objects.get(user=request.user)
    members = list(f.members.all())
    while len(members) < 6:
        members.append(None)

    data = {'members': members}
    return render(request, 'setting.html', data)


def index(request):
    print(request.user)
    if request.user.is_authenticated() is True:
        f = Family.objects.get(user=request.user)
        members = list(f.members.all())
        images = []
        for album in Album.objects.filter(family=f):
            for img in album.images.all():
                images.append(img.image.url.replace("/home/morigram/morigram-Django/",''))
        data = {'members': members, 'images': images}
        return render(request, 'home.html', data)
    else:
        return render(request, 'login.html')


@csrf_exempt
def add_member(req):
    data = req.POST
    family = Family.objects.get(user=req.user)
    fm = FamilyMember.objects.create(family=family)
    if req.FILES.get('img'):
        fm.profile_image = req.FILES['img']
    else:
        pass
    fm.position = data['role']
    fm.name = data['name']
    fm.save()
    return redirect('/setting/')
