web: /opt/venv/bin/python manage.py migrate && /opt/venv/bin/gunicorn referee_ally.wsgi:application --bind 0.0.0.0:$PORT
worker: /opt/venv/bin/python -m celery -A referee_ally worker --loglevel=info
beat: /opt/venv/bin/python -m celery -A referee_ally beat --loglevel=info
