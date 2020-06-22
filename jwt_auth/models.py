from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
  
    class UserType(models.TextChoices):
        CREATOR = 'cr', _('Creator')
        VIEWER = 'vw', _('Viewer')
        OTHER = 'ot', _('Other')
        
    email = models.CharField(max_length=50, unique=True)
    profile_image = models.CharField(max_length=500, blank=True)
    bio = models.CharField(max_length=500, blank=True)
    user_type = models.CharField(
        max_length=2,
        choices=UserType.choices,
        default=UserType.VIEWER
    )