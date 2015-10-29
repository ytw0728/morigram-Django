from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout


def login(request):
    if request.method == 'POST':
        data = request.POST
        user = authenticate(username=data['username'], password=data['password'])
        if user is not None:
            login(request,user)
        else:
            redirect('/')

        return render(request,'login.html')


def logout(request):
    logout(request)
    return redirect('/')
