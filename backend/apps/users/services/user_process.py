from django.db import transaction
from ..models import Profile, Account
from django.utils.crypto import get_random_string
from django.core.mail import send_mail

def create_confirmation_token():
    return get_random_string(32)


class UserService:

    @transaction.atomic
    def create_user(self, validated_data: dict) -> Profile:
        print(validated_data)
        django_user_data = validated_data.get('user')
        if django_user_data:
            user = Account.objects.create(
                username = django_user_data.get('username'),
                password = django_user_data.get('password'),
                email = django_user_data.get('email'),
                confirmation_token=create_confirmation_token(),

            )
            user.is_active = False
            user.save()
            print('отправляем письмо')

            self.send_confirmation_email(user)

            profile = Profile.objects.create(
                username = django_user_data.get('username'),
                email = django_user_data.get('email'),
                first_name = validated_data.get('first_name'),
                last_name = validated_data.get('last_name'),
                is_manager = validated_data.get('is_manager', False),
                user = user
            )
            print('saviiiiiiiiiiiiiiiiiiiiiiiing')
            profile.save()
            return profile
        
        raise ValueError("Data to django user was not found")
    
    def send_confirmation_email(self, user: Account):
        confirmation_url = f'localhost:8000/api/users/confirm/{user.confirmation_token}'
        print(user.email)
        send_mail(
            'Подтверждение учетной записи',
            f'Пожалуйста, подтвердите свою учетную запись, перейдя по ссылке: {confirmation_url}',
            'отправитель@example.com',
            [user.email],
        )
        print('письмо отправлено')