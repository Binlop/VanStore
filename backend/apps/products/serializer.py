from rest_framework import serializers
from typing import Union
from .models import Phone, Computer
from .services.device import PhoneService, ComputerService
from files.serializer import FileSerializer

class HandleDeviceSerializer(serializers.Serializer):
    
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
    
    def to_representation(self, value):
        """
        Сериалайзер определяет тип объекта и передает его в соответствующий сериализатор
        """
        if isinstance(value, Phone):
            serializer = PhoneSerializer(value)
        elif isinstance(value, Computer):
            serializer = ComputerSerializer(value)
        else:
            raise Exception('Unexpected type of MODEL object')
        return serializer.data

class DeviceSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    name = serializers.CharField()
    description = serializers.CharField()
    price = serializers.DecimalField(max_digits=19, decimal_places=10)
    quantity = serializers.IntegerField()
    warranty = serializers.IntegerField(required=False)
    release = serializers.IntegerField(required=False)
    image = FileSerializer(required=False)

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
    product_type = serializers.CharField()
    phone_model = serializers.CharField()
    code = serializers.CharField()
    release_year = serializers.IntegerField(required=False)
    back_color = serializers.CharField()
    side_color = serializers.CharField()
    declared_color = serializers.CharField()
    warranty = serializers.IntegerField()
    physical_sim_count = serializers.IntegerField()
    esim_count = serializers.IntegerField()
    sim_format = serializers.ChoiceField(choices=Phone.SIM_FORMAT_CHOICES)
    refresh_rate = serializers.IntegerField()
    ppi = serializers.IntegerField()
    aspect_ratio = serializers.CharField()
    color_depth = serializers.FloatField()
    screen_design = serializers.ChoiceField(choices=Phone.SCREEN_DESIGN_CHOICES)
    screen_diagonal = serializers.FloatField()
    body_type = serializers.ChoiceField(choices=Phone.BODY_TYPE_CHOICES)
    body_material = serializers.ChoiceField(choices=Phone.BODY_MATERIAL_CHOICES)
    os = serializers.ChoiceField(choices=Phone.OS_CHOICES)
    os_version = serializers.CharField()
    processor_model = serializers.CharField()
    number_of_cores = serializers.IntegerField()
    max_processor_frequency = serializers.FloatField()
    ram_type = serializers.CharField(required=False)
    ram_capacity = serializers.IntegerField()
    virtual_ram = serializers.BooleanField()
    internal_storage = serializers.IntegerField()
    main_camera_count = serializers.IntegerField()
    main_camera_resolution = serializers.CharField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service = PhoneService


class ComputerSerializer(DeviceSerializer):
    product_type = serializers.CharField()
    material = serializers.ChoiceField(choices=Computer.MATERIAL_TYPES)
    fingerprint_scanner = serializers.BooleanField()
    mechanical_keyboard = serializers.BooleanField()
    waterproof_keyboard = serializers.BooleanField()
    screen_diagonal = serializers.FloatField()
    touch_screen = serializers.BooleanField()
    processor_model = serializers.CharField()
    total_number_cores = serializers.IntegerField()
    processor_frequency = serializers.FloatField()
    memory_type = serializers.ChoiceField(choices=Computer.MEMORY_TYPES)
    amount_RAM = serializers.IntegerField()
    max_amount_RAM = serializers.IntegerField()
    total_volume_SSD = serializers.IntegerField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service = ComputerService