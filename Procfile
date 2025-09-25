web: python3 manage.py migrate && gunicorn referee_ally.wsgi:application --bind 0.0.0.0:$PORT
worker: python3 -m celery -A referee_ally worker --loglevel=info
beat: python3 -m celery -A referee_ally beat --loglevel=info
