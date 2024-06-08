from rest_framework import serializers
from typing import Union
from .models import Cart
from users.models import Account
from products.serializer import HandleDeviceSerializer, DeviceSerializer
from .services.cart import CartService

class CartSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    products = serializers.SerializerMethodField()

    def get_products(self, obj: Cart):
        # print(obj)
        products = obj.product.all()
        # print(products)
        content_objects = [product.content_object for product in products]
        # print(content_objects)
        serializer = HandleDeviceSerializer(content_objects, many=True, fields=('name', 'price'))
        return serializer.data

class CartProduct(serializers.Serializer):
    id = serializers.UUIDField()

# class CartSerializerInput(serializers.Serializer):
#     products = CartProduct()

    def create(self, validated_data: dict) -> Cart:
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            if user.is_anonymous:
                return ValueError('User must be not anomymous')
            
            validated_data['user'] = user
            service = CartService()
            return service.add_product_to_cart(validated_data=validated_data)
        
        else: return ValueError('Request user does not exist')