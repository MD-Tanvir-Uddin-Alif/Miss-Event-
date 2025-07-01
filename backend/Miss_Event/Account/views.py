from django.shortcuts import render
from .models import CustomUser
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from .serializers import CustomUserRegistrationSerializer
# Create your views here.


class CustomUserRegistrationView(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserRegistrationSerializer
    permission_classes = [AllowAny]
    