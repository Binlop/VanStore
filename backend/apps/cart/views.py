from rest_framework.response import Response
from rest_framework.views import APIView
from . import serializer as serializers
from .selector import CartSelector
from rest_framework import status


class CartViewBase(APIView):
    serializer = None
    selector = None

    def get_serializer_class(self, *args, **kwargs):
        if self.serializer:
            return self.serializer(*args, **kwargs)
        else:
            raise ValueError("Serializer is not set for view")
            
    def get_selector_class(self, *args, **kwargs):
        if self.selector:
            return self.selector(*args, **kwargs)
        else:
            raise ValueError("Selector is not set for view")
        
class CartView(CartViewBase):
    selector = CartSelector
    serializer = serializers.CartSerializer

    def get(self, request, format=None):
        print(request.user)
        selector = self.get_selector_class()
        cart = selector.get_user_cart(user=request.user)      
        serializer = self.get_serializer_class(cart)
        return Response(serializer.data)
    
    def post(self, request):
        print(request.data)
        serializer = serializers.CartSerializerInput(data=request.data)        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
