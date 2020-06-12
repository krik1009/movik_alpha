from django.urls import path
from .views import RegisterView, LoginView, ProfileView, ProfileEdit

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profiles/<int:pk>/', ProfileView.as_view()), 
    path('profiles/<int:pk>/edit/', ProfileEdit.as_view())
]