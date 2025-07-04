from django.contrib import admin
from .models import OrganizationModel
# Register your models here.

@admin.register(OrganizationModel)
class OrganizationMOdelAdmin(admin.ModelAdmin):
    list_display = ('id', 'organization', 'organizer', 'email', 'phone')
    search_fields = ('email', 'phone')
