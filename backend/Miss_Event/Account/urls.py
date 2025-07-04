from django.urls import path
from .views import CustomUserRegistrationView, VerifyView, LogoutView, UpdateProfileView, PasswordResetConfirmView, PasswordResetRequestView, ChangePasswordView, UserProfileView
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
    path('logout/', LogoutView.as_view(), name='logout'),
    path('update/profile/', UpdateProfileView.as_view(), name='update_profile'),
    path('profile/', UserProfileView.as_view(), name="user_profile"),
    
    # forgot password
    path('reset-password/request/', PasswordResetRequestView.as_view(), name='reset_password_request'),
    path('reset-password/confirm/<int:uid>/<str:token>/', PasswordResetConfirmView.as_view(), name='reset_password_confirm'),
    
    # change password
    path('change-password/', ChangePasswordView.as_view(), name="change_password"),
]
