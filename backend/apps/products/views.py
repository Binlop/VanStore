from rest_framework.response import Response
from rest_framework.views import APIView
from . import serializer as serializers
from .selector import DeviceSelector
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
        
class DeviceListView(DeviceViewBase):
    selector = DeviceSelector
    serializer = serializers.DeviceSerializer

    def get(self, request, format=None):
        selector = self.get_selector_class()
        devices = selector.get_list_products()      
        serializer = self.get_serializer_class()(devices, many=True)
        return Response(serializer.data)