from rest_framework import serializers
from .models import Profile, Account
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from django.core.validators import RegexValidator
from .services.user_process import UserService

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
        extra_kwargs = {"password": {"write_only": True}}

class RegistrationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(validators=[RegexValidator(r'^[\w.@+-]+$', 'Введите корректное имя пользователя. Можете использовать буквы, цифры и символы @/./+/-/_'), UniqueValidator(queryset=Account.objects.all(), message='Это имя пользователя уже занято.')])
    email = serializers.EmailField(validators=[UniqueValidator(queryset=Account.objects.all(), message='Этот адрес электронной почты уже зарегистрирован.')])
    password = serializers.CharField()
    # name = serializers.CharField()
    # firstname = serializers.CharField()
    # patronymic = serializers.CharField()
    # phone = serializers.CharField()

    class Meta:
        model = Account
        fields = ('password', 'username', 'email')

    def create(self, validated_data: dict) -> Account:
        service = UserService()
        return service.create_user(validated_data=validated_data)