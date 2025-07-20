from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password


class CustomUserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'phone', 'image', 'address', 'password', 'password1']
        
        extra_kwargs = {
            'first_name':{'required':True},
            'last_name':{'required':True},
            'username':{'required':True},
            'email':{'required':True},
            'password':{'write_only':True},
        }
        
    def validate(self, attrs):
        password = attrs.get('password')
        
        if password != attrs.get('password1'):
            raise serializers.ValidationError({'password':'Password did not match'})
        validate_password(password)
        return attrs

    def create(self, validated_data):
        validated_data.pop('password1')
        password = validated_data.get('password')
        
        user = CustomUser.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','first_name', 'last_name', 'username', 'email', 'phone', 'image','is_organizer']
        read_only_fields = ['id', 'username']


class ChangePasswordSeriliazer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    
    def validate_new_password(self, value):
        user = self.context["request"].user
        validate_password(value, user)
        return value
        