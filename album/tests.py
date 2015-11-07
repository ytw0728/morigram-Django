from django.test import TestCase
from django.test import Client
from rest_framework.test import APITestCase, APIClient

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

from django.test import TestCase

c = Client()
c.login(username='test', password='password')

class AlbumTestCase(TestCase):
    def setUp(self):
        self.testfiles = ['test.jpg', 'test2.png']
        self.testdires = ['중국에서'], ['베이징']

    def FileUpload(self, url, filename):
        with open(filename, "rb") as fp:
            res = c.post(url, {'name': 'image', 'file':fp})
        return res.json()

    def Mkdir(self, url, title):
        res = c.post(url, {'title': title})
        return res.json()

    def test_album(self):
        res = self.FileUpload('/album/',self.testfiles[0])
        self.assertEqual(res['is_success'], True)
        res = self.Mkdir('/album/', 'china')
        self.assertEqual(res['is_success'], True)
        res = self.FileUpload('/album/china/', 'beijing')
        self.assertEqual(res['is_success'], True)
        

