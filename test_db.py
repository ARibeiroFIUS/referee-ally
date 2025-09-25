#!/usr/bin/env python
import os
import django
from django.conf import settings

# Configure Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'juridico_rankings.settings')
django.setup()

# Test database connection
from django.db import connection

try:
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1")
        result = cursor.fetchone()
        print(f"✅ Database connection successful: {result}")
except Exception as e:
    print(f"❌ Database connection failed: {e}")

# Test models
from core.models import Anuario, Area, Cliente

try:
    count = Anuario.objects.count()
    print(f"✅ Models working: {count} anuarios found")
except Exception as e:
    print(f"❌ Models failed: {e}")
