from django.urls import path
from .views import CategoryListView, CategoryCreateView, CategoryDetailView

urlpatterns = [
  path('', CategoryListView.as_view()),
  path('new/', CategoryCreateView.as_view()),
  path('<int:pk>/', CategoryDetailView.as_view())
]