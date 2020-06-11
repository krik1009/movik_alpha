from rest_framework import serializers
from django.apps import apps

from .models import Category
Content = apps.get_model('contents', 'Content')

class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = ('id', 'title')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class PopulatedCategorySerializer(CategorySerializer):
    contents = ContentSerializer(many=True)