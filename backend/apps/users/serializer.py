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

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    username = serializers.CharField(validators=[RegexValidator(r'^[\w.@+-]+$', 'Введите корректное имя пользователя. Можете использовать буквы, цифры и символы @/./+/-/_'), UniqueValidator(queryset=Account.objects.all(), message='Это имя пользователя уже занято.')])
    email = serializers.EmailField(validators=[UniqueValidator(queryset=Account.objects.all(), message='Этот адрес электронной почты уже зарегистрирован.')])

    class Meta:
        model = Profile
        fields = ('user', 'first_name', 'last_name', 'username', 'email', 'is_manager')

    def create(self, validated_data: dict) -> Profile:
        service = UserService()
        return service.create_user(validated_data=validated_data)


class RegistrationSerializer(serializers.ModelSerializer):
   class Meta:
       model=Account
       fields=('email','username','password','first_name')
       extra_kwargs={'password':{'write_only':True}}

   def create(self,validated_data):
       password=validated_data.pop('password',None)
       instance=self.Meta.model(**validated_data)
       if password is not None:
           instance.set_password(password)
       instance.save()
       return instance