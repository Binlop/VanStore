from django.db import transaction
from ..models import Profile, User

class UserService:

    @transaction.atomic
    def create_user(self, validated_data: dict) -> Profile:
        print(validated_data)
        django_user_data = validated_data.get('user')
        if django_user_data:
            user = User.objects.create(
                username = django_user_data.get('username'),
                password = django_user_data.get('password'),
                email = django_user_data.get('email'),
            )
            user.save()

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