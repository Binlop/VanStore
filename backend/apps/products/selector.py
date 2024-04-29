from itertools import chain
from typing import Union
from django.shortcuts import get_object_or_404
from .models import Device, Phone, Computer

class DeviceSelector:

    def get_list_products(self) -> Union[Phone, Computer]:
        phone_qs = Phone.objects.all()
        computer_qs = Computer.objects.all()

        device_list = list(chain(phone_qs, computer_qs))

        return device_list
    
    def get_detail_product(self, pk) -> Union[Phone, Computer]:
        device = Phone.objects.get(id=pk)
        return device
        # models = [Phone, Computer]
        # for model in models:
        #     try:
        #         device = model.objects.get(pk=pk)
        #         return device
        #     except model.DoesNotExist:
        #         continue