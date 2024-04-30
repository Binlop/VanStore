from typing import Union
from django.db import transaction
from products.models import Device, Phone, Computer

class DeviceService:
    model = None

    @transaction.atomic
    def create_device(self, validated_data: dict) -> Union[Phone, Computer]:
        product = self.model.objects.create(
            name = validated_data.get('name'),
            description = validated_data.get('description'),
            price = validated_data.get('price', 0),
            quantity = validated_data.get('quantity', 0),
        )
        product.save()

        device = Device.objects.create(
            content_object = product
        )
        device.save()

        return product

    @transaction.atomic
    def update_device(self, product: Union[Phone, Computer], validated_data: dict) -> Union[Phone, Computer]:
        product.name = validated_data.get('name', product.name)
        product.description = validated_data.get('description', product.description)
        product.price = validated_data.get('price', product.price)
        product.quantity = validated_data.get('quantity', product.quantity)

        product.save()
        return product
    
class PhoneService(DeviceService):
    model = Phone

class ComputerService(DeviceService):
    model = Computer