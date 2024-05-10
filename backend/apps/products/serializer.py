from rest_framework import serializers
from typing import Union
from .models import Phone, Computer
from .services.device import PhoneService, ComputerService

class HandleDeviceSerializer(serializers.Serializer):
    def __init__(self, *args, **kwargs):
        self.custom_fields = kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)

    def to_representation(self, value):
        """
        Сериалайзер определяет тип объекта и передает его в соответствующий сериализатор
        """
        if isinstance(value, Phone):
            serializer = PhoneSerializer(value, fields=self.custom_fields)
        elif isinstance(value, Computer):
            serializer = ComputerSerializer(value, fields=self.custom_fields)
        else:
            raise Exception('Unexpected type of MODEL object')
        return serializer.data

class DeviceSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    name = serializers.CharField()
    description = serializers.CharField()

    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)
        
        super().__init__(*args, **kwargs)
        self.service = None

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

    def create(self, validated_data: dict):
        if self.service:
            return self.service.create_device(validated_data=validated_data)
        else:
            raise ValueError("Service is not set for serializer")
    
    def update(self, instance: Union[Phone, Computer], validated_data: dict):
        if self.service:
            return self.service.update_device(instance, validated_data)
        else:
            raise ValueError("Service is not set for serializer")


class PhoneSerializer(DeviceSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service = PhoneService


class ComputerSerializer(DeviceSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service = ComputerService