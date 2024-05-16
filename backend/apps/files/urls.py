from django.urls import path
from . import views

urlpatterns = [
    path('products/images/<str:uuid>/', views.FileView.as_view()),
]