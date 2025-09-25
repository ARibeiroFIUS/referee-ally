from .settings import *
import dj_database_url
from decouple import config

# Override settings for production
DEBUG = False
ALLOWED_HOSTS = ['*.railway.app', 'localhost', '127.0.0.1']

# Database Railway PostgreSQL
DATABASES = {
    'default': dj_database_url.parse(config('DATABASE_URL'))
}

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Railway specific
CSRF_TRUSTED_ORIGINS = ['https://*.railway.app']

# Security
SECRET_KEY = config('SECRET_KEY', default='django-insecure-fallback-key')
