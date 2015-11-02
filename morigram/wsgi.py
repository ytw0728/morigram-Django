"""
WSGI config for morigram project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/howto/deployment/wsgi/
"""

import os
import sys
import site

from morigram.settings import BASE_DIR

from django.core.wsgi import get_wsgi_application
site.addsitedir("/home/nero/.virtualenvs/morigram/bin")
sys.path.append(os.path.abspath(BASE_DIR))
sys.path.append(os.path.abspath(os.path.join(BASE_DIR,'/morigram')))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "morigram.settings")

application = get_wsgi_application()
