from rest_framework import serializers
from .models import EventModel, EventRegistration


class EventSerializer(serializers.ModelSerializer):
    organization_name = serializers.ReadOnlyField(source="organization.organization")
    banner_url = serializers.SerializerMethodField()


    class Meta:
        model = EventModel
        fields = [
            "id", "organization", "organization_name",
            "title", "description", "start_time", "end_time",
            "location", "banner_url","banner" ,"capacity", "created_at", "updated_at"
        ]
        read_only_fields = ["organization", "organization_name", "created_at", "updated_at"]
    
    def get_banner_url(self, obj):
        return obj.banner.url if obj.banner else None


class EventRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventRegistration
        fields = ['id', 'user', 'event', 'joined_at']
        read_only_fields = ['user', 'joined_at', 'event']