from .base import *

# EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_BACKEND = "djcelery_email.backends.CeleryEmailBackend"
EMAIL_HOST = env("EMAIL_HOST")
EMAIL_USE_TLS = True
EMAIL_PORT = env("EMAIL_PORT")
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")
DEFAULT_FROM_EMAIL = "cinfacol@gmail.com"
DOMAIN = env("DOMAIN")
SITE_NAME = "Shop Eline"


DATABASES = {
    "default": {
        "ENGINE": env("POSTGRES_ENGINE"),
        "NAME": env("POSTGRES_DB"),
        "USER": env("POSTGRES_USER"),
        "PASSWORD": env("POSTGRES_PASSWORD"),
        "HOST": env("PG_HOST"),
        "PORT": env("PG_PORT"),
    }
}

DATABASES["default"]["ATOMIC_REQUESTS"] = True


CELERY_BROKER_URL = env("CELERY_BROKER")
CELERY_RESULT_BACKEND = env("CELERY_BACKEND")
CELERY_TIMEZONE = "America/Bogota"

""" BT_ENVIRONMENT = env("BT_ENVIRONMENT")
BT_MERCHANT_ID = env("BT_MERCHANT_ID")
BT_PUBLIC_KEY = env("BT_PUBLIC_KEY")
BT_PRIVATE_KEY = env("BT_PRIVATE_KEY") """
