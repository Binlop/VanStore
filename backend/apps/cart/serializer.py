from rest_framework import serializers
from typing import Union
from .models import Cart
from django.contrib.auth.models import User
from products.serializer import HandleDeviceSerializer

class CartSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    products = serializers.SerializerMethodField()

    def get_products(self, obj: Cart):
        products = obj.product.all()
        serializer = HandleDeviceSerializer(products, many=True, fields=('name', 'price'))
        return serializer.data

    def create(self, validated_data: dict) -> Cart:
        username = validated_data.get('username')
        if username is not None:
            user = User.objects.get(username=username)

            cart = Cart.objects.create(
                user = user
            )
        