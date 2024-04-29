from rest_framework import serializers
from typing import Union
from .models import Phone, Computer
from .services.device import PhoneService, ComputerService


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

class HandleDeviceSerializer(serializers.Serializer):

    def to_representation(self, value):
        """
        Serialize bookmark instances using a bookmark serializer,
        and note instances using a note serializer.
        """
        if isinstance(value, Phone):
            serializer = PhoneSerializer(value)
        elif isinstance(value, Computer):
            serializer = ComputerSerializer(value)
        else:
            raise Exception('Unexpected type of MODEL object')
        return serializer.data

class PhoneSerializer(DeviceSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service = PhoneService


class ComputerSerializer(DeviceSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service = ComputerService