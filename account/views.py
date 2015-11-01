from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as l, logout
from django.contrib.auth.models import User
from account.models import Family
from django.views.decorators.csrf import csrf_exempt

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
    logout(request)
    return redirect('/')

@csrf_exempt
def setting(request):
    return render(request, 'setting.html')


def index(request):
    print(request.user)
    if request.user.is_authenticated() is True:
        return render(request, 'home.html')
    else:
        return render(request, 'login.html')
