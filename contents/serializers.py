from rest_framework import serializers
from .models import Content

from comments.serializers import CommentSerializer, PopulatedCommentSerializer
from likes.serializers import LikeSerializer
from tags.serializers import TagSerializer
from categories.serializers import CategorySerializer

from django.contrib.auth import get_user_model
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = '__all__'


class PopulatedContentSerializer(ContentSerializer):
    owner = UserSerializer()
    comments = PopulatedCommentSerializer(many=True)
    likes = LikeSerializer(many=True)
    tags = TagSerializer(many=True)
    categories = CategorySerializer(many=True)