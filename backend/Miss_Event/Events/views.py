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
    
    def perform_update(self, serializer):
        event = self.get_object()
        old_title = event.title
        updated_event = serializer.save()
        
        registrations = EventRegistration.objects.filter(event=updated_event)
        # for reg in registrations:
        #     send_event_email(
        #         subject="Event Updated",
        #         message=(
        #             f"Hi {reg.user.username},\n\n"
        #             f"The event '{old_title}' you registered for has been updated.\n"
        #             f"New Title: {updated_event.title}\n"
        #             f"Start: {updated_event.start_time}\n"
        #             f"End: {updated_event.end_time}\n"
        #             f"Location: {updated_event.location}"
        #         ),
        #         recipient_email=reg.user.email
        #     )
    
    def perform_destroy(self, instance):
        event_title = instance.title
        registrations = EventRegistration.objects.filter(event=instance)
        
        
        # for reg in registrations:
        #     send_event_email(
        #         subject="Event Cancelled",
        #         message=(
        #             f"Hi {reg.user.username},\n\n"
        #             f"The event '{event_title}' you registered for has been cancelled by the organizer.\n"
        #             f"We're sorry for the inconvenience."
        #         ),
        #         recipient_email=reg.user.email
        #     )
        instance.delete()



class OrganizationEventsView(ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        org_id = self.kwargs['org_id']
        return EventModel.objects.filter(organization__id=org_id)


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