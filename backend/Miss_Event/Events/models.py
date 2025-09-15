from django.db import models
from Account.models import CustomUser
from django.conf import settings
from Organization.models import OrganizationModel
from cloudinary.models import CloudinaryField
# Create your models here.


class EventModel(models.Model):
    organization = models.ForeignKey(OrganizationModel, on_delete=models.CASCADE, related_name='events')
    title = models.CharField(max_length=200)
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    location = models.CharField(max_length=200)
    # banner = models.ImageField(upload_to="banners/" ,blank=True, null=True)
    banner = CloudinaryField('banner', folder='Banner' ,blank=True, null=True)
    capacity = models.PositiveBigIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.title} ({self.organization.organization})"



class EventRegistration(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    event = models.ForeignKey(EventModel, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'event')
    
    def __str__(self):
        return f"{self.user.username} -> {self.event.title}"