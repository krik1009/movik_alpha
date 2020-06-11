from django.db import models

class Follower(models.Model):
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name = 'followings',
        on_delete = models.CASCADE
    )
    to = models.ForeignKey(
        'jwt_auth.User',
        related_name = 'followers',
        on_delete = models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)