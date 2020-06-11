from django.urls import path
from .views import ContentListView, ContentDetailView

urlpatterns = [
    path('', ContentListView.as_view()),
    path('<int:pk>/', ContentDetailView.as_view()),
]
