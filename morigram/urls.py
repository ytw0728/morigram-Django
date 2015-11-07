from django.conf import settings
from django.contrib import admin
from django.conf.urls.static import static
from django.conf.urls import include, url
from account.views import register, login, setting, index, logout
from album.views import album
from bucketlist.views import BucketListView


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^register/', register),
    url(r'^album/', album),
    url(r'^logout', logout),
    url(r'^login/', login),
    url(r'^setting/', setting),
    url(r'^bucketlist/', BucketListView.as_view({'get': 'get', 'post':'post'})),
    url(r'$', index),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
