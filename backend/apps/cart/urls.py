from django.urls import path
from . import views

urlpatterns = [
    path('', views.CartView.as_view()),
    path('add/', views.CartView.as_view()),
    path('products/', views.ListProductsToCartView.as_view())
]