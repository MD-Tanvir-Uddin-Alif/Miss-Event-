from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.generics import (
    CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
)

from .serializers import EventSerializer
from .models import EventModel
from .permissions import IsOrganizerAndOwner
# Create your views here.


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