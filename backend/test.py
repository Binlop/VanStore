import os
from django.conf import settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.django.local')

if settings.SECRET_KEY:
    print(settings.SECRET_KEY)
    print("Секретный ключ существует")
else:
    print("Секретный ключ не существует")