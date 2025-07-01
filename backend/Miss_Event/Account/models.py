from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class CustomUser(AbstractUser):
    is_organizer = models.BooleanField(default=False)
    phone = models.CharField(max_length=11, blank=True)
    image = models.ImageField(upload_to="avatars/" ,blank=True, null=True)
    address = models.TextField()
    account_created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.username