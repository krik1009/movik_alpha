from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Follower
from .serializers import FollowerSerializer, PopulatedFollowerSerializer


class FollowerListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, _request):
        followers = Follower.objects.all()
        serailized_followers = PopulatedFollowerSerializer(followers, many=True)
        return Response(serailized_followers.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        created_follower = FollowerSerializer(data=request.data)
        if created_follower.is_valid():
            created_follower.save()
            return Response(created_follower.data, status=status.HTTP_201_CREATED)
        return Response(created_follower.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class FollowerDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_follower(self, pk):
        try:
            return Follower.objects.get(pk=pk)
        except Follower.DoesNotExist:
            raise NotFound()

    def is_follower_owner(self, follower, user):
        if follower.owner.id != user.id:
            raise PermissionDenied()

    def delete(self, request, pk):
        follower_to_delete = self.get_follower(pk)
        self.is_follower_owner(follower_to_delete, request.user)
        follower_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
