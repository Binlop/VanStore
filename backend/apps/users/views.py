from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializer import RegistrationSerializer
from rest_framework.views import APIView
from rest_framework import status
from .models import Account

from .serializer import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user
    profile = user.profile
    serializer = RegistrationSerializer(profile)
    return Response(serializer.data)


class RegisterView(APIView):

    def post(self, request):
        print(request.data)
        serializer = RegistrationSerializer(data=request.data)        
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Письмо отправлено на указанную почту. Подтвердите свою учетную запись.'}, status=status.HTTP_201_CREATED)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ConfirmAccountView(APIView):
    def get(self, request, token):
        try:
            user = Account.objects.get(confirmation_token=token)
        except Account.DoesNotExist:
            return Response({'error': 'Invalid confirmation token'}, status=status.HTTP_400_BAD_REQUEST)

        user.is_active = True
        user.confirmation_token = None
        user.save()

        return Response({'message': 'Учетная запись подтверждена успешно'})

