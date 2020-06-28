# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Comment
from .serializers import CommentSerializer, PopulatedCommentSerializer


class CommentListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, _request):
        comments = Comment.objects.all()
        serailized_comments = PopulatedCommentSerializer(comments, many=True)
        return Response(serailized_comments.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        created_comment = CommentSerializer(data=request.data)
        if created_comment.is_valid():
            created_comment.save()
            return Response(created_comment.data, status=status.HTTP_201_CREATED)
        return Response(created_comment.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class CommentLikeView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_comment(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise NotFound()

    def put(self, request, pk, user):
        comment_to_like = self.get_comment(pk)
        if comment_to_like.owner.id != user.id:
            request.data['liked'] = request.user.id 
            updated_comment = CommentSerializer(comment_to_like, data=request.data)
            if updated_comment.is_valid():
                updated_comment.save()
                return Response(updated_comment.data, status=status.HTTP_202_ACCEPTED)
            return Response(updated_comment.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        return Response(updated_comment.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class CommentDeleteView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_comment(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise NotFound()

    def is_comment_owner(self, comment, user):
        if comment.owner.id != user.id:
            raise PermissionDenied()

    def delete(self, request, pk):
        comment_to_delete = self.get_comment(pk)
        self.is_comment_owner(comment_to_delete, request.user)
        comment_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
