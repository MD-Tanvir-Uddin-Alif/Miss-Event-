from django.shortcuts import render
from .serializers import OrganizationRegistrationSerializer
from .models import OrganizationModel
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
# Create your views here.

class OrganizationRegisterView(CreateAPIView):
    queryset = OrganizationModel.objects.all()
    serializer_class = OrganizationRegistrationSerializer
    permission_classes = [AllowAny]
