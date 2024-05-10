from cart.models import Cart

class CartService:

    def create(self, validated_data: dict) -> Cart:
        