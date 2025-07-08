from django.urls import path
from .views import OrganizerEventCreateView, OrganizerEventDetailView

urlpatterns = [
    path('create/', OrganizerEventCreateView.as_view(), name="create_event"),
    path('detail/<int:pk>/', OrganizerEventDetailView.as_view(), name='detail_event'),
]
