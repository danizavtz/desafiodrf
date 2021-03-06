from django.contrib.auth.models import User, Group
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'password']
    
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(UserSerializer, self).create(validated_data)