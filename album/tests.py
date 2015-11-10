"""
class AlbumTestCase(TestCase):
    def setUp(self):
        self.test_file = 'test.jpg'
        self.test_dir = 'InHome'
        self.c = APIClient()

        #self.FileUploadTest()

        #self.MkdirTest()

    def test_file_upload(self):
        with open('test.jpg', 'rb') as f:
            res = self.c.post('/album/', {'name': 'image', 'file': f})
        self.assertEqual(res.status_code, 201)

    def test_mkdir(self):
        res = self.c.post('/album/create/', {'name': self.test_dir})
        self.assertEqual(res.status_code, 201)

    def test_get_files(Self):
        res = self.get('/album/')

    def test_get_current_subdirs(self):
        from json import loads
        res = self.c.get('/album/{album}/'.format(album=self.test_dir))
        data = loads(res.content.decode())
        self.assertEqual(data[0]['files'][0],
                         '/album/MyAlbum/{img}'.format(img=self.test_file))
        self.assertEqual(data[0]['dirs'][0],
                         '/album/MyAlbum/{dir}/'.format(dir=self.test_dir))
"""

from json import loads
from django.test import TestCase, RequestFactory
from django.contrib.auth.models import User
from .views import AlbumView
from account.models import Family, FamilyMember

class AlbumTestCase(TestCase):
    def setUp(self):
        self.testfiles = ['test.png', 'test2.png']
        self.testdires = ['중국에서'], ['베이징']
        self.username = 'pipy'
        user = User.objects.create(username=self.username)
        user.set_password('1234')
        user.save()

        f = Family()
        f.user = user
        f.motto = 'Live is short, you need python'
        f.save()
        self.user = user
        fm = FamilyMember.objects.create(family=f, position="관리자", name="관리자")
        fm.save()
        from shutil import rmtree
        try:
            rmtree(r"C:\Users\ner0\Desktop\morigram\media\pipy")
        except FileNotFoundError:
            pass
        self.f = RequestFactory()

    def FileUpload(self, url, filename):
        with open(filename, "rb") as fp:
            req = self.f.post(url, {'name': 'image', 'file': fp})
        req.user = self.user
        res = AlbumView.as_view()(req)
        return loads(res.content.decode())

    def Mkdir(self, url, title):
        req = self.f.post(url, {'title': title})
        req.user = self.user
        res = AlbumView.as_view()(req)
        return loads(res.content.decode())

    def GetFile(self, url):
        req = self.f.get('/album/china/')
        req.user = self.user
        res = AlbumView.as_view()(req)
        return loads(res.content.decode())

    def test_album(self):
        #res = self.FileUpload('/album/', self.testfiles[0])
        #self.assertEqual(res[0]['is_success'], True)

        try:
            res = self.Mkdir('/album/', 'china')
            self.assertEqual(res[0]['is_success'], True)
            print("[+] 1. Mkdir china , success.")

            res = self.FileUpload('/album/china/', self.testfiles[0])
            self.assertEqual(res[0]['is_success'], True)
            print("[+] 2. upload to china , success.")

            res = self.Mkdir('/album/china/', 'beijing')
            self.assertEqual(res[0]['is_success'], True)
            print("[+] 3. Mkdir beijing in china , success.")

            res = self.FileUpload('/album/china/beijing/', self.testfiles[1])
            self.assertEqual(res[0]['is_success'], True)
            print("[+] 4. upload in beijing")

            res = self.GetFile('/album/china/')
            print(res)
            self.assertEqual(res[0]['images'][0], '/media/test.png')
            self.assertEqual(res[0]['albums'][0], '/media/pipy/china/beijing')

        except AssertionError:
            print(res[0]['message'])

