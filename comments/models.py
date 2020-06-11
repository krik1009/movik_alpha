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
        related_name = 'comments',
        on_delete = models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'comment {self.comment} is posted on {self.content}'

# 0. id
# 1. Comment
# 2. Owner -> One to many: User 8. comments
# 3. Content -> One to many : Content / 15. Comments
# 4. CreatedAt