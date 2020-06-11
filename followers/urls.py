from django.urls import path
from .views import FollowerListView, FollowerDetailView

urlpatterns = [
  path('', FollowerListView.as_view()),
  path('<int:pk>/', FollowerDetailView.as_view())
]