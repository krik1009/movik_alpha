from django.urls import path
from .views import RequestListView, RequestEditView, RequestPostView

urlpatterns = [
    path('', RequestPostView.as_view()),
    path('admin/', RequestListView.as_view()),
    path('admin/<int:pk>/edit/', RequestEditView.as_view())
]