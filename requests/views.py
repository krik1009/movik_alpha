# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Request
from .serializers import RequestSerializer


class RequestPostView(APIView):
    def post(self, request):
        created_request = RequestSerializer(data=request.data)
        if created_request.is_valid():
            created_request.save()
            return Response(created_request.data, status=status.HTTP_201_CREATED)
        return Response(created_request.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class RequestListView(APIView):
    permission_classes = (IsAuthenticated, )
    
    def is_admin(self, request, user):
        if user.is_superuser == False or user.is_staff == False:
            raise PermissionDenied()
    
    def get(self, request):
        requests = Request.objects.all()
        self.is_admin(requests, request.user)
        serialized_requests = RequestSerializer(requests, many=True)
        return Response(serialized_requests.data, status=status.HTTP_200_OK)


class RequestEditView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_request(self, pk):
        try:
            return Request.objects.get(pk=pk)
        except Request.DoesNotExist:
            raise NotFound()

    def is_admin(self, request, user):
        if user.is_superuser == False or user.is_staff == False:
            raise PermissionDenied()

    def get(self, request, pk):
        req = self.get_request(pk)
        self.is_admin(req, request.user)
        serialized_request = RequestSerializer(req)
        return Response(serialized_request.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk):
        request_to_update = self.get_request(pk)
        self.is_admin(request_to_update, request.user)
        updated_request = RequestSerializer(request_to_update, data=request.data)
        if updated_request.is_valid():
            updated_request.save()
            return Response(updated_request.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_request.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        request_to_delete = self.get_request(pk)
        self.is_admin(request_to_delete, request.user)
        request_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)