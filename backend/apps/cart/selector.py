from itertools import chain
from typing import Union
from django.shortcuts import get_object_or_404
from users.models import Account
from products.models import Device, Phone, Computer
import json
from .models import Cart

class CartSelector:

    def get_list_products(self) -> Union[Phone, Computer]:
        phone_qs = Phone.objects.all()
        computer_qs = Computer.objects.all()

        device_list = list(chain(phone_qs, computer_qs))

        return device_list
    
    def get_user_cart(self, data: list[int], user: Account) -> Union[Phone, Computer]:
        # data = json.loads(data)
        # data = json.loads(data.get('id', None))
        # print(data)
        # uuids = []
        # for i, uuid in enumerate(data):
        #     # print(uuid)
        #     uuids.append(str(uuid).replace('-', ''))
        #     print(uuids)
        if user.is_anonymous:
            data = json.loads(data.get('id', None))
            print(data)
            uuids = []
            for i, uuid in enumerate(data):
                # print(uuid)
                uuids.append(str(uuid).replace('-', ''))    

            phone_qs = Phone.objects.filter(id__in=uuids)
            computer_qs = Computer.objects.filter(id__in=uuids)

            device_list = list(chain(phone_qs, computer_qs))  
            return device_list

        cart = Cart.objects.get(user=user)
        return cart