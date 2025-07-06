from rest_framework import serializers
from .models import OrganizationModel
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model

User = get_user_model()


class OrganizationRegistrationSerializer(serializers.ModelSerializer):
    username  = serializers.CharField(write_only=True, required=True)
    password  = serializers.CharField(write_only=True, required=True)
    password1  = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = OrganizationModel
        fields = ['id', 'organization', 'address1', 'address2', 'phone', 'link', 'email', 'description', 'logo', 'username', 'password', 'password1']
        
        extra_kwargs = {
            'username':{'required':True},
            'email':{'required':True},
            'phone':{'required':True},
            'password':{'required':True},
            'organization':{'required':True},
            'address1':{'required':True},
        }
    
    def validate(self, attrs):
        password = attrs.get('password')
        
        if password != attrs.get('password1'):
            raise serializers.ValidationError({'password':'Password did not match'})
        validate_password(password)
        return attrs

    def create(self, validated_data):
        validated_data.pop('password1')       
        username = validated_data.pop('username')
        email = validated_data.get('email')
        password = validated_data.pop('password')
        
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            is_organizer=True,
            is_active=False
        )
        
        organization = OrganizationModel.objects.create(
            organizer=user,
            **validated_data,
        )
        
        return organization


class OrganizationDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationModel
        fields = ['id', 'organization', 'address1', 'address2', 'phone', 'link', 'email', 'description', 'logo',]
        read_only_fields = ['id']