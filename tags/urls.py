from django.urls import path
from .views import TagListView, TagDetailView, TagCreateView, TagDeleteView

urlpatterns = [
    path('', TagListView.as_view()),
    path('new/', TagCreateView.as_view()),
    path('<int:pk>/', TagDetailView.as_view()),
    path('<int:pk>/delete/', TagDeleteView.as_view())
]