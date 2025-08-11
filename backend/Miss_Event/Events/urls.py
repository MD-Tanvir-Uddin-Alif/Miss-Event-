from django.urls import path
from .views import OrganizerEventCreateView, OrganizerEventDetailView, PublicEventView, EventRegistrationView, CancleRegistration, OrganizationEventsView, UserEvent

urlpatterns = [
    path('create/', OrganizerEventCreateView.as_view(), name="create_event"),
    path('detail/<int:pk>/', OrganizerEventDetailView.as_view(), name='detail_event'),
    path('public/', PublicEventView.as_view(), name='public_event'),
    path('organization/<int:org_id>/events/', OrganizationEventsView.as_view(), name='organization-events'),
    path('register/<int:event_id>/', EventRegistrationView().as_view(), name='register_event'),
    path('cancle/register/<int:event_id>/', CancleRegistration.as_view(), name='cancle_register_event'),
    path('user-event/<int:user_id>', UserEvent.as_view(), name="user_Event"),
]
