"""
Django settings for project project.

Generated by 'django-admin startproject' using Django 3.0.7.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""
import os
import django_heroku
import cloudinary
import cloudinary.uploader
import cloudinary.api
import environ
from decouple import config

env = environ.Env(
    DEBUG=(bool, False)
)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# env_file = os.path.join(BASE_DIR, '.env')
environ.Env.read_env(
    # env_file
    )

# # reading .env file
# READ_ENV_FILE = env.bool('DJANGO_READ_ENV_FILE', default=False)

# if READ_ENV_FILE:
#     env_file = str(BASE_DIR.path('.env'))
#     env.read_env(env_file)
    
# environ.Env.read_env()

# False if not in os.environ
DEBUG = config('DEBUG')

# Raises django's ImproperlyConfigured exception if SECRET_KEY not in os.environ
SECRET_KEY = config('SECRET_KEY')
# SECRET_KEY = os.environ['SECRET_KEY']


CLOUD_NAME = config('CLOUD_NAME')
API_KEY = config('API_KEY')
API_SECRET = config('API_SECRET')



# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = os.getenv("SECRET_KEY")
# SECRET_KEY = '$09zc8^0u_#y_bj&wq=$n(_q@^ubk59xcl#h^d36tv8mswc&4m'

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'cloudinary_storage',
    'django.contrib.staticfiles',
    'cloudinary',
    'rest_framework',
    'jwt_auth',
    'followers',
    'likes',
    'tags',
    'categories',
    'comments',
    'contents',
    'requests'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'frontend')], #Look, we have added the root folder of frontend here
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'project.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'contents',
        'HOST': 'localhost',
        'PORT': 5432
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'jwt_auth.authentication.JWTAuthentication'
    ],
}
# # regsitering our custom user model as the auth model.
AUTH_USER_MODEL = 'jwt_auth.User'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/


# MEDIA_ROOT = {
#   'MEDIA_URL': 'api/requests/'
# }

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': CLOUD_NAME,
    'API_KEY': API_KEY,
    'API_SECRET': API_SECRET
}

ROOT_URLCONF = 'project.urls' #check if you have this already, if not add it in

STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'frontend', "build", "static"), 
)

django_heroku.settings(locals())