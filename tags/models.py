from django.db import models

class Tag(models.Model): 
    name = models.CharField(max_length=50, unique=True)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name = 'your_tags',
        on_delete = models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)