import uuid
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from utils.base_models import BaseModel

class Device(BaseModel):
    """
    Модель определяет техническую таблицу, обеспечивающую связь между различными типами товаров и
    передаваемым uuid товара
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.UUIDField(null=True)
    content_object = GenericForeignKey("content_type", "object_id")

    class Meta:
        indexes = [
            models.Index(fields=["content_type", "object_id"]),
        ]
        verbose_name = 'гаджет'
        verbose_name_plural = 'гаджеты'

    def __str__(self):
        return self.content_object.name 

class DeviceBase(BaseModel):
    """
    Абстрактная модель, определяющая общие поля у всех гаджетов интернет-магазина
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.SlugField(verbose_name='Название товара')
    description = models.TextField(verbose_name='Описание товара', null=True, help_text="Технические характеристики устройства")
    price = models.DecimalField(verbose_name="Цена товара", max_digits=19, decimal_places=10)
    quantity = models.IntegerField(verbose_name="Кол-во товара", default=0)
    rating = models.FloatField(verbose_name='Рейтинг', default=5)
    reliability = models.FloatField(verbose_name='Надежность', default=5)

    # Заводские данные
    warranty = models.IntegerField(verbose_name='Гарантия срок мес.', null=True, default=None)
    manufacturer = models.CharField(verbose_name='Страна-производитель', max_length=100, default='')

    # Внешний вид
    housing_material = models.CharField(max_length=100, default='metal')  # Добавлено поле housing_material с дефолтным значением 'metal'

    # Экран
    screen_diagonal = models.FloatField(verbose_name='Диагональ экрана (дюйм)', default=0)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name 

class Phone(DeviceBase):
    """
    Модель, описывающая характеристики телефона
    """
    device = GenericRelation(Device, related_query_name="phone")

    class Meta:
        verbose_name = 'телефон'
        verbose_name_plural = 'телефоны'

    
class Computer(DeviceBase):
    """
    Модель, описывающая характеристики компьютеров
    """
    device = GenericRelation(Device, related_query_name="computer")

    class Meta:
        verbose_name = 'компьютер'
        verbose_name_plural = 'компьютеры'