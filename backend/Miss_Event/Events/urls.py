from django.urls import path
from .views import OrganizerEventCreateView

urlpatterns = [
    path('create/', OrganizerEventCreateView.as_view(), name="create_event"),
]
