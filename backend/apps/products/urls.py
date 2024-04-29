from django.urls import path
from . import views

urlpatterns = [
    path('', views.DeviceListView.as_view()),
    path('<uuid:pk>/', views.DeviceDetailView.as_view()),
]