web: python manage.py migrate && gunicorn referee_ally.wsgi:application --bind 0.0.0.0:$PORT
worker: celery -A referee_ally worker --loglevel=info
beat: celery -A referee_ally beat --loglevel=info
