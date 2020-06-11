from rest_framework import serializers
from .models import Comment
from django.contrib.auth import get_user_model
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class PopulatedCommentSerializer(CommentSerializer):
    owner = UserSerializer()