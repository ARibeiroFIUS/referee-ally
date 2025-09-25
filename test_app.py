#!/usr/bin/env python
import os
import sys
import django
from django.conf import settings

# Add the project directory to Python path
sys.path.append('/app')

# Configure Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'juridico_rankings.settings')
django.setup()

# Test basic Django functionality
from django.http import HttpResponse
from django.urls import path
from django.core.wsgi import get_wsgi_application

def test_view(request):
    return HttpResponse("✅ Django is working!")

# Simple URL configuration
urlpatterns = [
    path('', test_view),
    path('test/', test_view),
]

# Test WSGI
application = get_wsgi_application()
print("✅ Django application loaded successfully!")
