from rest_framework import serializers
from typing import Union
from .models import Cart
from users.models import Account
from products.serializer import HandleDeviceSerializer
from .services.cart import CartService

class CartSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    products = serializers.SerializerMethodField()

    def get_products(self, obj: Cart):
        products = obj.product.all()
        serializer = HandleDeviceSerializer(products, many=True, fields=('name', 'price'))
        return serializer.data

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