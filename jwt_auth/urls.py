from django.urls import path
from .views import RegisterView, LoginView, ProfileDetailView, ProfileEdit, ProfileListView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profiles/', ProfileListView.as_view()),
    path('profiles/<int:pk>/', ProfileDetailView.as_view()), 
    path('profiles/<int:pk>/edit/', ProfileEdit.as_view())
]