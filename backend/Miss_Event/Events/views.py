from django.shortcuts import render
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import (
    CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView,RetrieveAPIView
)

from .serializers import EventSerializer, EventRegistrationSerializer
from .models import EventModel, EventRegistration
from .permissions import IsOrganizerAndOwner

from Utils.email_send_util import send_event_email
# Create your views here.




# Organiazation Event Part

class OrganizerEventCreateView(CreateAPIView):
    queryset = EventModel.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsOrganizerAndOwner]
    
    def perform_create(self, serializer):
        serializer.save(organization=self.request.user.organizationmodel)



class OrganizerEventDetailView(RetrieveUpdateDestroyAPIView):
    queryset = EventModel.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsOrganizerAndOwner]


class PublicEventView(ListAPIView):
    queryset = EventModel.objects.select_related('organization').order_by('start_time')
    serializer_class = EventSerializer
    permission_classes = [AllowAny]



# User Event Part 


class EventRegistrationView(CreateAPIView):
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        event_id = self.kwargs['event_id']
        event_obj = EventModel.objects.get(id=event_id)
        user = self.request.user
        
        if EventRegistration.objects.filter(user=user, event=event_obj).exists():
            raise ValidationError({"detail": "You are already registered for this event."})
        serializer.save(user=user, event=event_obj)
        
        
        send_event_email(
            subject="Event Registration Successful",
            message=f"Hi {user.username}, you successfully registered for {event_obj.title}.",
            recipient_email=user.email
        )
        
        organizer = event_obj.organization.organizer
        send_event_email(
        subject="Someone Registered for Your Event!",
        message=f"User {user.username} just registered for your event '{event_obj.title}'.",
        recipient_email=organizer.email
        )


class CancleRegistration(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):
        user = request.user
        event_id = kwargs.get('event_id')

        try:
            registration = EventRegistration.objects.get(user=user, event_id=event_id)
            event = registration.event

            organizer = event.organization.organizer
            registration.delete()

            send_event_email(
                subject="Event Registration Cancelled",
                message=f"Hi {user.username}, you have successfully cancelled your registration for '{event.title}'.",
                recipient_email=user.email
            )

            send_event_email(
                subject="Event Registration Cancelled by User",
                message=f"{user.username} has cancelled their registration for your event '{event.title}'.",
                recipient_email=organizer.email
            )

            return Response({"detail": "Registration cancelled."}, status=status.HTTP_204_NO_CONTENT)

        except EventRegistration.DoesNotExist:
            return Response({"detail": "Not registered for this event."}, status=status.HTTP_404_NOT_FOUND)