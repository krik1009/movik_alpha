from rest_framework import serializers
from django.apps import apps
from .models import Follower
from django.contrib.auth import get_user_model
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follower
        fields = '__all__'


class PopulatedFollowerSerializer(FollowerSerializer):
    owner = UserSerializer()
    to = UserSerializer()