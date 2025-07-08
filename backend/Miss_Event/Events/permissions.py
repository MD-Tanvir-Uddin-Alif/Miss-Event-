from rest_framework.permissions import BasePermission


class IsOrganizerAndOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            request.user.is_authenticated
            and request.user.is_organizer
            and hasattr(request.user, "organizationmodel")
            and obj.organization == request.user.organizationmodel
        )
