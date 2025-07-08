from django.shortcuts import render
from rest_framework.generics import (
    CreateAPIView, RetrieveUpdateDestroyAPIView
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