from django.urls import path
from .views  import OrganizationRegisterView, OrganizerDetailsView

urlpatterns = [
    path('register/', OrganizationRegisterView.as_view(), name="register_organizatio"),
    path('details/', OrganizerDetailsView.as_view(), name='organization_details'),
]
