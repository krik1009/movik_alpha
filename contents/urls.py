from django.urls import path
from .views import ContentListView, ContentDetailView, ContentCreateView, ContentEditDeleteView

urlpatterns = [
    path('', ContentListView.as_view()),
    path('new/', ContentCreateView.as_view()),
    path('<int:pk>/', ContentDetailView.as_view()),
    path('<int:pk>/edit/', ContentEditDeleteView.as_view())
]