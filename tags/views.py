# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Tag
from .serializers import TagSerializer, PopulatedTagSerializer


class TagListView(APIView):
    # permission_classes = (IsAuthenticated, )
    
    def get(self, _request):
        tags = Tag.objects.all()
        serialized_tags = PopulatedTagSerializer(tags, many=True)
        return Response(serialized_tags.data, status=status.HTTP_200_OK)
      
    def post(self, request):
        request.data['owner'] = request.user.id
        created_tag = TagSerializer(data=request.data)
        if created_tag.is_valid():
            created_tag.save()
            return Response(created_tag.data, status=status.HTTP_201_CREATED)
        return Response(created_tag.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class TagDetailView(APIView):
    # permission_classes = (IsAuthenticated, )

    def get_tag(self, pk):
        try:
            return Tag.objects.get(pk=pk)
        except Tag.DoesNotExist:
            raise NotFound()

    def is_tag_owner(self, tag, user):
        if tag.owner.id != user.id:
            raise PermissionDenied()

    def get(self, _request, pk):
        tag = self.get_tag(pk)
        serialized_tag = PopulatedTagSerializer(tag)
        return Response(serialized_tag.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        tag_to_delete = self.get_tag(pk)
        self.is_tag_owner(tag_to_delete, request.user)
        tag_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)