from django.db import models
from django.conf import settings
from Account.models import CustomUser
from cloudinary.models import CloudinaryField
# Create your models here.


class OrganizationModel(models.Model):
    organizer = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    organization = models.CharField(max_length=100)
    address1 = models.CharField(max_length=300)
    address2 = models.CharField(max_length=300, blank=True, null=True)
    phone = models.CharField(max_length=11)
    link = models.URLField()
    email = models.EmailField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    # logo = models.ImageField(upload_to="Logo/", blank=True, null=True)
    logo = CloudinaryField('logo', folder='Logo', blank=True, null=True)
    
    def __str__(self):
        return f"{self.organization} ({self.organizer.username})"