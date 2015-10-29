from django.test import TestCase
from rest_framework.test import APITestCase, APIClient
from json import loads

class BucketListTestCase(TestCase):
    def setUp(self):
        self.c = APIClient()
        
    def TestCreate(self):
        """
        with open('test_bucket.jpg', 'rb') as fp:
            res = self.c.post('/buckets/', {'title':'test','img':fp})
        """
        res = self.c.post('/buckets/', {'title': 'test', 'family': 1})
        self.assertEqual(res.status_code, 200)
        data = loads(res.content.decode())
        print(data)
        self.assertEqual(data[0]['success'], 'True')
    
    def TestGet(self):
        res = self.c.get('/buckets/')
        data = loads(res.content.decode())
        self.assertEqual(data[0]['title'], 'test')
        #self.assertEqual(data[0]['img'], 'http://layer7.kr:8000/static/img/')

    def test_create_get(self):
        self.TestCreate()
        self.TestGet()
