from django.urls import path
from .views import CustomUserRegistrationView, VerifyView
from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('registration/', CustomUserRegistrationView.as_view(), name='User_registration'),
    path("verify-email/<str:token>/", VerifyView.as_view(), name="verify-email"),
    path('login/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('refresh/access_token/', TokenRefreshView.as_view(), name='refresh_access_token'),
    path('access_token/verify/', TokenVerifyView.as_view(), name='verify_access_token'),
]
