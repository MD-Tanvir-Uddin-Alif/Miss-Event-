from django.contrib import admin
from .models import EventModel, EventRegistration
# Register your models here.

@admin.register(EventModel)
class EventModelAdmin(admin.ModelAdmin):
    list_display = ('id','organization', 'title', 'location', 'capacity')
    search_fields = ('organization', 'location')


@admin.register(EventRegistration)
class EventRegisterAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'event', 'joined_at')
    search_fields = ('user', 'event', 'joined_at')
