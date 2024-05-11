from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

app_name = 'users'

urlpatterns = [
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('profile/', views.get_profile),

    path('confirm/<str:token>/', views.ConfirmAccountView.as_view()),

    path('register/', views.RegisterView.as_view()),

]