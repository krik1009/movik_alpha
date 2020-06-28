from django.urls import path
from .views import CommentListView, CommentLikeView, CommentDeleteView

urlpatterns = [
  path('', CommentListView.as_view()),
  path('<int:pk>/edit/', CommentLikeView.as_view()),
  path('<int:pk>/', CommentDeleteView.as_view()),
]