from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as l, logout as lg
from django.contrib.auth.models import User
from account.models import Family
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from account.models import Family, FamilyMember
from album.models import Album

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = request.POST
        user = User.objects.create(username=data['email'])
        user.set_password(data['password'])
        user.save()

        f = Family()
        f.user = user
        f.motto = data['motto']
        f.save()

        fm = FamilyMember.objects.create(family=f, position="관리자", name="관리자")
        fm.save()
        return redirect('/')

    else:
        return render(request, 'register.html')

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = request.POST
        user = authenticate(username=data['email'], password=data['password'])
        if user is not None:
            l(request, user)
            return redirect('/')
        else:
            return render(request, 'login.html', {'msg': 'check your id and password!'})
    else:
        return render(request, 'login.html')

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
    members = []
    data = {'members': members}
    return render(request, 'setting.html', data)


def index(request):
    print(request.user)
    if request.user.is_authenticated() is True:
        f = Family.objects.get(user=request.user)
        members = list(f.members.all())
        albums = list(Album.objects.filter(family=f))
        data = {'members': members, 'albums':albums}
        return render(request, 'home.html', data)
    else:
        return render(request, 'login.html')


def add_member(req):
    data = req.POST
    fm = FamilyMember.objects.create(family=req.user, position=data['position'], 
        name=data['name'])
    fm.save()
