from itertools import chain
from typing import Union
from django.shortcuts import get_object_or_404
from users.models import Account
from products.models import Phone, Computer
from .models import Cart

class CartSelector:

    def get_list_products(self) -> Union[Phone, Computer]:
        phone_qs = Phone.objects.all()
        computer_qs = Computer.objects.all()

        device_list = list(chain(phone_qs, computer_qs))

        return device_list
    
    def get_user_cart(self, user: Account) -> Union[Phone, Computer]:
        if user.is_anonymous:
            raise Cart.DoesNotExist('User in not exist')
        cart = Cart.objects.get(user=user)
        return cart