from django.conf import settings
from django.contrib import admin
from django.conf.urls.static import static
from django.conf.urls import include, url
from django.views.decorators.csrf import csrf_exempt
from account.views import register, login, setting, index, logout, add_member
from album.views import album_view, album_render, thumbnail


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^register/', register),
    url(r'^album/(?P<path>.*)', album_render),
    url(r'^api/album/(?P<path>.*)', csrf_exempt(album_view)),
    url(r'^api/album-thumbnail/', thumbnail),
    url(r'^logout', logout),
    url(r'^login/', login),
    url(r'^setting/', setting),
    url(r'^add_member/', add_member),
    #url(r'^bucketlist/', BucketListView.as_view({'get': 'get', 'post':'post'})),
    url(r'^$', index),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
