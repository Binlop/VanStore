from django.db import transaction
from ..models import Profile, Account
from django.utils.crypto import get_random_string
from django.core.mail import send_mail

def create_confirmation_token():
    return get_random_string(32)


class UserService:

    @transaction.atomic
    def create_user(self, validated_data: dict) -> Profile:
        user = Account.objects.create(
            username = validated_data.get('username'),
            # password = 
            email = validated_data.get('email'),
            confirmation_token=create_confirmation_token(),

        )
        user.set_password(validated_data.get('password'))
        user.is_active = False
        user.save()
        print('отправляем письмо')

        self.send_confirmation_email(user)

        profile = Profile.objects.create(
            is_manager = validated_data.get('is_manager', False),
            user = user
        )
        print('saviiiiiiiiiiiiiiiiiiiiiiiing')
        profile.save()
        return user
        
    
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