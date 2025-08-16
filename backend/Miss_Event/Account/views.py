import uuid
from django.urls import reverse
from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import CustomUser
from .utils import password_reset_token
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from django.conf import settings
from .serializers import CustomUserRegistrationSerializer, UserProfileSerializer, ChangePasswordSeriliazer


from Events.views import send_async_email
# Create your views here.


class CustomUserRegistrationView(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserRegistrationSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        token = str(uuid.uuid4())
        user.email_verification_token = token
        user.is_active = False
        user.save()
        
        verify_path = reverse('verify-email', kwargs={'token': token})  
        verify_link = f"{settings.SITE_DOMAIN}{verify_path}"
        # verify_link = f"http://http://127.0.0.1:8000//api/user/verify-email/{token}/"
        
        try:
            send_mail(
                subject="Verify your email",
                message=f"Hello {user.username}, click here to verify your account: {verify_link}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,  
            )
        except Exception as e:
            user.delete()
            return Response(
                {"error": f"Registration failed. Could not send verification email: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        return Response(
            {"message": "Registration successful. Please check your email to verify your account."},
            status=status.HTTP_201_CREATED
        )






class VerifyView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, token):
        try:
            user = CustomUser.objects.get(email_verification_token=token)
            user.is_active = True
            user.email_verification_token = None
            user.save()
            return HttpResponseRedirect("http://localhost:5173/#/activate-account")
        except:
            return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UpdateProfileView(RetrieveUpdateAPIView):
    queryset = CustomUser
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user


User = get_user_model()


class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get("email")
        
        if not email:
            return Response({"detail": "Email is required."}, status=400)
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "User with this email does not exist."}, status=404)

        token = password_reset_token.make_token(user)
        uid = user.id
        
        # reset_link = f"http://127.0.0.1:8000/api/user/reset-password/confirm/{uid}/{token}/"
        reset_link = f"http://localhost:5173/#/forget/password/create?uid={uid}&token={token}"

        send_mail(
            subject="Password Reset Request",
            message=f"Hi {user.username}, click the link below to reset your password:\n\n{reset_link}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email]
        )
        return Response({"detail": "Password reset email has been sent."}, status=200)


class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, uid, token):
        new_password = request.data.get("password")
        
        if not new_password:
            return Response({"detail": "Password is required."}, status=400)
        
        try:
            user = User.objects.get(id=uid)
        except User.DoesNotExist:
            return Response({"detail": "Invalid user."}, status=404)
        
        if not password_reset_token.check_token(user , token):
            return Response({"detail": "Invalid or expired token."}, status=400)
        
        user.set_password(new_password)
        user.save()
        
        return Response({"detail": "Password has been reset successfully."}, status=200)


class ChangePasswordView(UpdateAPIView):
    serializer_class = ChangePasswordSeriliazer
    model = User
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        
        if not user.check_password(serializer.validated_data["old_password"]):
            return Response(
                {"old_password": ["Old password is incorrect."]},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        user.set_password(serializer.validated_data["new_password"])
        user.save()
        
        return Response({"detail": "Password changed successfully."}, status=status.HTTP_200_OK)


class UserProfileView(RetrieveAPIView):
    queryset = CustomUser
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user