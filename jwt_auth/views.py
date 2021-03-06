# pylint: disable=no-member, no-self-use
from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from .serializers import UserSerializer, PopulatedUserSerializer, UpdateUserSerializer
User = get_user_model()


class RegisterView(APIView):      
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration Successful'})
        return Response(serializer.errors, status=422)


class LoginView(APIView):
    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid Credentilais' })

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid Credentilais' })
        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode({'sub': user.id, 'exp': int(
            dt.strftime('%s'))}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user.username}'})


class ProfileListView(APIView):
    def get(self, _request):
        users = User.objects.all()
        serialized_users = PopulatedUserSerializer(users, many=True)
        return Response(serialized_users.data, status=status.HTTP_200_OK)


class ProfileDetailView(APIView):
    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound()
          
    def get(self, _request, pk):
        user = self.get_user(pk)
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)



class ProfileEdit(APIView):
    permission_classes = (IsAuthenticated, )
    
    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound()
    
    def is_profile_owner(self, profile, user):
        if profile.id != user.id:
            raise PermissionDenied()
 
    def put(self, request, pk):
        profile_to_update = self.get_user(pk)
        self.is_profile_owner(profile_to_update, request.user)
        updated_profile = UpdateUserSerializer(profile_to_update, data=request.data)

        if updated_profile.is_valid():
            updated_profile.save()
            return Response(updated_profile.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_profile.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
      
    def delete(self, request, pk):
        user_to_delete = self.get_user(pk)
        self.is_profile_owner(user_to_delete, request.user)
        user_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)