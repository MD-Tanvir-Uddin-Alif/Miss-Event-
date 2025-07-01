from django.urls import path
from .views import CustomUserRegistrationView

urlpatterns = [
    path('registration/', CustomUserRegistrationView.as_view(), name='User_registration'),
]
