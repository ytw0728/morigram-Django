from django.shortcuts import render, redirect
from django.http.response import HttpResponse
from bucketlist.serializer import BucketListSerializer
from bucketlist.models import BucketList
from account.models import Family
from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework import status,views,mixins
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from django.contrib.auth.decorators import login_required

class BucketListView(viewsets.ModelViewSet):
    queryset = BucketList.objects.all()
    serializer_class = BucketListSerializer
    parser_classes = (MultiPartParser, FormParser,)

    def get(self, req, *arg, **kwargs):
        if req.user.is_authenticated() == True:
            return render(req, 'bucket_list.html')
        else:
            return redirect('/')

    def post(self, req, *arg, **kwargs):
        req.data['image'] = req.stream.FILES['image']
        req.data['title'] = req.stream.POST['title']
        req.data['family'] = Family.objects.filter(user=req.user).first()
        return self.create(req, *arg, **kwargs)

    def perform_create(self, serializer):
        family = Family.objects.filter(user=self.request.user).first()
        img = self.request.data.get('image')
        serializer.save(family=family,image=img)
    #serializer_class = BucketListSerializer
        
"""
    def get(self,request,*args,**kwargs):
        return Response(request.data)

    def post(self, request, *args, format='multipart'):
        data = request.FILES
        print(data)
        serializer = BucketListSerializer(data=data)

        print(serializer.is_valid(), serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return HttpResponse("nono")
"""

@login_required
def bucketlist(req):
    family = Family.objects.get(user=req.user)
    if req.method == 'POST':
        data = req.POST

        b = BucketList.objects.create(family=family, title=data['title'])
        return redirect('/bucketlist/')

    else:
        data = {'members': list(family.members.all()) }
        return render(request, 'bucketlist.html', data)

