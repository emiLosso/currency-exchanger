# -*- coding: utf-8 -*-
from .base import *
import os
from .secrets import APP_KEY

DEBUG = True

ADMIN_ENABLED = False

ALLOWED_HOSTS = ['localhost', '*']

SECRET_KEY = APP_KEY

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
