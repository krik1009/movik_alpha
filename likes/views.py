from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Like
from .serializers import LikeSerializer


class LikeListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, _request):
        likes = Like.objects.all()
        serailized_likes = LikeSerializer(likes, many=True)
        return Response(serailized_likes.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        created_like = LikeSerializer(data=request.data)
        if created_like.is_valid():
            created_like.save()
            return Response(created_like.data, status=status.HTTP_201_CREATED)
        return Response(created_like.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LikeDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_like(self, pk):
        try:
            return Like.objects.get(pk=pk)
        except Like.DoesNotExist:
            raise NotFound()

    def is_like_owner(self, like, user):
        if like.owner.id != user.id:
            raise PermissionDenied()

    def delete(self, request, pk):
        like_to_delete = self.get_like(pk)
        self.is_like_owner(like_to_delete, request.user)
        like_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
