from products.models import Device
from django.db import transaction
from ..models import Cart

class CartService:

    @transaction.atomic
    def add_product_to_cart(self, validated_data):
        product_uuid = str(validated_data.get('id')).replace('-', '')
        print(product_uuid)
        if product_uuid:
            product_base = Device.objects.get(object_id=product_uuid)
            product = product_base.content_object

            user = validated_data.get('user')
            cart = Cart.objects.filter(user=user).first()

            if cart:
                cart.product.add(product_base)
                cart.save()
            else:
                cart = Cart.objects.create(
                    user = user
                )
                cart.product.add(product_base)
                cart.save()
            return cart

    @transaction.atomic
    def remove_product_from_cart(self, validated_data):
        product_uuid = validated_data.get('uuid')
        if product_uuid:
            product_base = Device.objects.get(id=product_uuid)
            product = product_base.content_object

            user = validated_data.get('user')
            cart = Cart.objects.filter(user=user).first()

            if cart:
                cart.product.remove(product)
                cart.save()
            else:
                raise Cart.DoesNotExist('Корзина для данного пользователя не была найдена')