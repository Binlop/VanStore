from django.db import models
from utils.base_models import BaseModel
from users.models import Account
from django.contrib.contenttypes.fields import GenericRelation
import uuid 
from products.models import Device


class Cart(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(Account, on_delete=models.CASCADE, related_name='cart')
    product = models.ManyToManyField(Device)

    class Meta:
        verbose_name = 'корзина'
        verbose_name_plural = 'корзина'

    def __str__(self) -> str:
        return f'Cart {self.id}'