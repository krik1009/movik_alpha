from django.db import models
from django.utils.translation import gettext_lazy as _


# def request_directory_path(instance, filename):
#     return 'request_{0}/{1}'.format(instance.request.email, filename)
  
class Request(models.Model): 
  
    class UserType(models.TextChoices):
      CREATOR = 'cr', _('Creator')
      VIEWER = 'vw', _('Viewer')
      OTHER = 'ot', _('Other')
    
    email = models.CharField(max_length=50)
    user_type = models.CharField(
        max_length=2,
        choices=UserType.choices,
        default=UserType.CREATOR
    )
    subject = models.CharField(max_length=100)
    description = models.CharField(max_length=10000)
    # file = models.FileField(upload_to={request_directory_path}, blank=True)
    # # file = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_answered = models.BooleanField(default=False)
    is_solved = models.BooleanField(default=False)