from django.db import models


class Comment(models.Model):
    comment = models.CharField(max_length=500)
    commented_content = models.ForeignKey(
        'contents.Content',
        related_name = 'comments',
        on_delete = models.CASCADE
    )
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name = 'posted_comments',
        on_delete = models.CASCADE
    )
    liked = models.ManyToManyField(
        'jwt_auth.User',
        related_name='liked_comments',
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)