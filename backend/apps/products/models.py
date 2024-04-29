import uuid
from django.db import models
from utils.base_models import BaseModel

class Device(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(verbose_name='Название товара', max_length=256)
    description = models.TextField(verbose_name='Описание товара', null=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name 

class Phone(Device):

    class Meta:
        verbose_name = 'телефон'
        verbose_name_plural = 'телефоны'

    
class Computer(Device):

    class Meta:
        verbose_name = 'компьютер'
        verbose_name_plural = 'компьютеры'