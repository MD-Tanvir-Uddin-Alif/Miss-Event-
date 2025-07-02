from django.urls import path
from .views import CustomUserRegistrationView, VerifyView

urlpatterns = [
    path('registration/', CustomUserRegistrationView.as_view(), name='User_registration'),
    path("verify-email/<str:token>/", VerifyView.as_view(), name="verify-email"),
]
