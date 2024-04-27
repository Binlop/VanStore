from typing import Union
from django.db import transaction
from products.models import Phone, Computer

class DeviceService:
    model = None

    @transaction.atomic
    def create_device(self, validated_data: dict) -> Union[Phone, Computer]:
        device = self.model.objects.create(
            name = validated_data.get('name'),
            description = validated_data.get('description')
        )
        device.save()
        return device

    @transaction.atomic
    def update_device(self, device: Union[Phone, Computer], validated_data: dict) -> Union[Phone, Computer]:
        device.name = validated_data.get('name', device.name)
        device.description = validated_data.get('description', device.description)

        device.save()
        return device
    
class PhoneService(DeviceService):
    model = Phone

class ComputerService(DeviceService):
    model = Phone