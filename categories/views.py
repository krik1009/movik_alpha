# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Category
from .serializers import CategorySerializer, PopulatedCategorySerializer


class CategoryListView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, _request):
        categories = Category.objects.all()
        serialized_categories = PopulatedCategorySerializer(categories, many=True)
        return Response(serialized_categories.data, status=status.HTTP_200_OK)
      
    def post(self, request):
        request.data['owner'] = request.user.id
        created_category = CategorySerializer(data=request.data)
        if created_category.is_valid():
            created_category.save()
            return Response(created_category.data, status=status.HTTP_201_CREATED)
        return Response(created_category.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class CategoryDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_category(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise NotFound()

    def is_category_owner(self, category, user):
        if category.owner.id != user.id:
            raise PermissionDenied()

    def delete(self, request, pk):
        category_to_delete = self.get_category(pk)
        self.is_category_owner(category_to_delete, request.user)
        category_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)