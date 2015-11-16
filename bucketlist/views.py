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
from album.views import jsonify
from django.views.decorators.csrf import csrf_exempt

"""
class BucketListView(viewsets.ModelViewSet):
    queryset = BucketList.objects.all()
    serializer_class = BucketListSerializer
    parser_classes = (MultiPartParser, FormParser,)

    def get(self, req, *arg, **kwargs):
        if req.user.is_authenticated() == True:
            return Response(req.data)
            #return render(req, 'bucket_list.html')
        else:
            return redirect('/')

    def post(self, req, *arg, **kwargs):
        req.data['img'] = req.stream.FILES['img']
        req.data['title'] = req.stream.POST['title']
        req.data['family'] = Family.objects.filter(user=req.user).first()
        return self.create(req, *arg, **kwargs)

    def put(self, req, *arg, **kwargs):
        try:
            is_archived = int(req.data['is_archived'])
            family = Family.objects.get(usre=req.user)
            bl = BucketList.objects.get(family=family)
            bl.is_archived = bool(is_archived)
            bl.save()
            data = [{'is_success': True}]
        except:
            data = [{'is_success': False}]
        return jsonify(data, 200)

    def perform_create(self, serializer):
        family = Family.objects.filter(user=self.request.user).first()
        img = self.request.data.get('img')
        serializer.save(family=family,img=img)
    #serializer_class = BucketListSerializer


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

@csrf_exempt
@login_required
def bucketlist(req):
    family = Family.objects.get(user=req.user)
    if req.method == 'POST':
        title = req.POST['title']
        try:
            img = req.FILES['img']
            b = BucketList.objects.create(family=family, title=title, image=img)
        except:
            b = BucketList.objects.create(family=family, title=title)

        return redirect('/bucketlist/')

    else:
        bls = BucketList.objects.filter(family=family)
        data = {'data': list(bls)}

        return render(req, 'bucket_list.html', data)

