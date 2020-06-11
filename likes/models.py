from django.db import models

class Like(models.Model):
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name = 'liked_contents',
        on_delete = models.CASCADE
    )
    content = models.ForeignKey(
        'contents.Content',
        related_name = 'likes',
        on_delete = models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)