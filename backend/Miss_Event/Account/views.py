import uuid
from django.shortcuts import render
from .models import CustomUser
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.core.mail import send_mail
from django.conf import settings
from .serializers import CustomUserRegistrationSerializer, UserProfileSerializer
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
        
        verify_link = f"http://127.0.0.1:8000/api/user/verify-email/{token}/"
        
        send_mail(
            subject="Verify your email",
            message=f"Hello {user.username}, click here to verify: {verify_link}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )
        
        return Response(
            {"message": "Registration successful. Please check your email to verify your account."},
            status=status.HTTP_201_CREATED
        )

class VerifyView(APIView):
    def get(self, request, token):
        try:
            user = CustomUser.objects.get(email_verification_token=token)
            user.is_active = True
            user.email_verification_token = None
            user.save()
            return Response({"message": "Email verified successfully. You can now log in."})
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