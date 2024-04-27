from itertools import chain
from typing import Union
from .models import Phone, Computer

class DeviceSelector:

    def get_list_products(self) -> Union[Phone, Computer]:
        phone_qs = Phone.objects.all()
        computer_qs = Computer.objects.all()

        device_list = list(chain(phone_qs, computer_qs))

        return device_list