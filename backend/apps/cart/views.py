from rest_framework.response import Response
from rest_framework.views import APIView
from . import serializer as serializers
from .selector import CartSelector
from rest_framework import status


class DeviceViewBase(APIView):
    serializer = None
    selector = None

    def get_serializer_class(self):
        if self.serializer:
            return self.serializer
        else:
            raise ValueError("Serializer is not set for view")
            
    def get_selector_class(self):
        if self.selector:
            return self.selector()
        else:
            raise ValueError("Selector is not set for view")
        
class CartDetailView(DeviceViewBase):
    selector = CartSelector
    serializer = serializers.CartSerializer

    def get(self, request, format=None):
        selector = self.get_selector_class()
        devices = selector.get_list_products()      
        serializer = self.get_serializer_class()(devices, many=True)
        return Response(serializer.data)
    
class DeviceDetailView(DeviceViewBase):
    selector = DeviceSelector
    serializer = serializers.HandleDeviceSerializer

    def get(self, request, pk):
        selector = self.get_selector_class()
        device = selector.get_detail_product(pk=pk)
        serializer = self.get_serializer_class()(device)
                
        return Response(serializer.data)