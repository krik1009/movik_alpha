from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
  
    class UserType(models.TextChoices):
        CREATOR = 'cr', _('Creator')
        VIEWER = 'vw', _('Viewer')
        
    email = models.CharField(max_length=50, unique=True)
    profile_image = models.CharField(max_length=500, blank=True)
    bio = models.CharField(max_length=500, blank=True)
    user_type = models.CharField(
        max_length=2,
        choices=UserType.choices,
        default=UserType.VIEWER
    )
# 0. id
# 1. username    (str)
# 2. email/unique   (str)
# 3. password  (str)
# 4. password confirmation (str)
# 5. bio (str)
# 6. uploaded contents (array) -> One to many: Content / 0. id
# 7. liked contents (array) -> Many to many: Content / 14. Likes
# 8. comments (array) -> One for Comment / 2. Owner
# 13. tags -> Many to Many - Tag / 3. selected_user


# 11. following (array)
# 12. followed_by (array)


## nice to have
# 9. messages_sent (array)
# 10. messages_received (array)