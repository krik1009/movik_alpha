# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status

from .models import Content
from .serializers import ContentSerializer, PopulatedContentSerializer

import cloudinary
import cloudinary.uploader
import cloudinary.api

class ContentListView(APIView):
    def get(self, _request):
        contents = Content.objects.all()
        serailized_contents = PopulatedContentSerializer(contents, many=True)
        return Response(serailized_contents.data, status=status.HTTP_200_OK)


class ContentCreateView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        request.data['owner'] = request.user.id
        new_content = ContentSerializer(data=request.data)
        if new_content.is_valid():
            new_content.save()
            return Response(new_content.data, status=status.HTTP_201_CREATED)
        return Response(new_content.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class ContentDetailView(APIView):
    def get_content(self, pk):
        try:
            return Content.objects.get(pk=pk)
        except Content.DoesNotExist:
            raise NotFound()

    def get(self, _request, pk):
        content = self.get_content(pk)
        serialized_content = PopulatedContentSerializer(content)
        return Response(serialized_content.data, status=status.HTTP_200_OK)
      

class ContentEditDeleteView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_content(self, pk):
        try:
            return Content.objects.get(pk=pk)
        except Content.DoesNotExist:
            raise NotFound()

    def is_content_owner(self, content, user):
        if content.owner.id != user.id:
            raise PermissionDenied()

    def put(self, request, pk):
        content_to_update = self.get_content(pk)
        self.is_content_owner(content_to_update, request.user)
        request.data['owner'] = request.user.id
        updated_content = ContentSerializer(content_to_update, data=request.data)
        if updated_content.is_valid():
            updated_content.save()
            return Response(updated_content.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_content.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        content_to_delete = self.get_content(pk)
        self.is_content_owner(content_to_delete, request.user)
        content_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)