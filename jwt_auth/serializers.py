# pylint: disable=arguments-differ
from rest_framework import serializers
from django.contrib.auth import get_user_model

# import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from contents.serializers import ContentSerializer
from comments.serializers import CommentSerializer
from likes.serializers import LikeSerializer
from tags.serializers import TagSerializer
from categories.serializers import CategorySerializer
from followers.serializers import FollowerSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):  
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)
    comments = CommentSerializer(many=True, required=False)
    # tags = TagSerializer(many=True, required=False)
    # uploaded_contents = ContentSerializer(many=True, required=False)
    # likes = LikeSerializer(many=True, required=False)

    def validate(self, data):
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')
        if password != password_confirmation:
            raise ValidationError({'password_confirmation': 'does not match'})
        # try:
        #     validations.validate_password(password=password)
        # except ValidationError as err:
        #     raise serializers.ValidationError({'password': err.messages})
        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = '__all__'


class PopulatedUserSerializer(UserSerializer):
    uploaded_contents = ContentSerializer(many=True, required=False)
    liked_contents = LikeSerializer(many=True, required=False)
    your_tags = TagSerializer(many=True, required=False)
    created_categories = CategorySerializer(many=True, required=False)
    followers = FollowerSerializer(many=True, required=False)
    followings = FollowerSerializer(many=True, required=False)


class UpdateUserSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = User
        exclude = ('password', )