import uuid
from django.conf import settings
from django.db import transaction
from rest_framework import status
from django.shortcuts import render
from .serializers import OrganizationRegistrationSerializer, OrganizationDetailsSerializer
from .models import OrganizationModel
from rest_framework.generics import CreateAPIView, RetrieveAPIView,RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.core.mail import send_mail
from Account.models import CustomUser

# Create your views here.

class OrganizationRegisterView(CreateAPIView):
    queryset = OrganizationModel.objects.all()
    serializer_class = OrganizationRegistrationSerializer
    permission_classes = [AllowAny]

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        organization = serializer.save()           
        user = organization.organizer              

        token = str(uuid.uuid4())
        user.email_verification_token = token
        user.save(update_fields=["email_verification_token"])

        verify_link = f"http://127.0.0.1:8000/api/user/verify-email/{token}/"
        send_mail(
            subject="Verify your email",
            message=f"Hi {user.username}, click to verify your organizer account: {verify_link}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )

        return Response(
            {
                "detail": "Organizer account created. Please verify your e‑mail.",
                "organization_id": organization.id,
            },
            status=status.HTTP_201_CREATED,
        )



class OrganizerDetailsView(RetrieveAPIView):
    queryset = OrganizationModel.objects.all()
    serializer_class = OrganizationDetailsSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user.organizationmodel


class OrganizationDetailUpdateView(RetrieveUpdateAPIView):
    queryset = OrganizationModel
    serializer_class = OrganizationDetailsSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user.organizationmodel