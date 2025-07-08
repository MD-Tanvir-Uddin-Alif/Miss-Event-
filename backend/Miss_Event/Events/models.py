from django.db import models
from Account.models import CustomUser
from Organization.models import OrganizationModel
# Create your models here.


class EventModel(models.Model):
    organization = models.ForeignKey(OrganizationModel, on_delete=models.CASCADE, related_name='events')
    title = models.CharField(max_length=200)
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    location = models.CharField(max_length=200)
    capacity = models.PositiveBigIntegerField()
    createad_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.title} ({self.organization.organization})"


