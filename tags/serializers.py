from rest_framework import serializers
from django.apps import apps

from .models import Tag
Content = apps.get_model('contents', 'Content')


class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class PopulatedTagSerializer(TagSerializer):
    tagged_contents = ContentSerializer(many=True)