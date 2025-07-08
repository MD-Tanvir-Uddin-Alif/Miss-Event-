from django.contrib import admin
from .models import EventModel
# Register your models here.

@admin.register(EventModel)
class EventModelAdmin(admin.ModelAdmin):
    list_display = ('organization', 'title', 'location', 'capacity')
    search_fields = ('organization', 'location')
