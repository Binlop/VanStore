from rest_framework import serializers
from .models import Profile, User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.validators import UnicodeUsernameValidator
from rest_framework.validators import UniqueValidator
from django.core.validators import RegexValidator
from .services.user_process import UserService


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {"password": {"write_only": True}}

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    username = serializers.CharField(validators=[RegexValidator(r'^[\w.@+-]+$', 'Введите корректное имя пользователя. Можете использовать буквы, цифры и символы @/./+/-/_'), UniqueValidator(queryset=User.objects.all(), message='Это имя пользователя уже занято.')])
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all(), message='Этот адрес электронной почты уже зарегистрирован.')])

    class Meta:
        model = Profile
        fields = ('user', 'first_name', 'last_name', 'username', 'email', 'is_manager')

    def create(self, validated_data: dict) -> Profile:
        service = UserService()
        return service.create_user(validated_data=validated_data)