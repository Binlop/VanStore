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
    name = models.CharField(verbose_name='Название товара',max_length=256)
    description = models.TextField(verbose_name='Описание товара', null=True, help_text="Технические характеристики устройства")
    price = models.DecimalField(verbose_name="Цена товара", max_digits=19, decimal_places=10)
    quantity = models.IntegerField(verbose_name="Кол-во товара", default=0)
    rating = models.FloatField('Рейтинг', default=5.0)
    warranty = models.IntegerField(verbose_name="Гарантия продавца / производителя, мес", null=True, blank=True)
    release = models.IntegerField(verbose_name="Дата релиза, год", null=True, blank=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name 

class Phone(DeviceBase):
    """
    Модель, описывающая характеристики телефона
    """
    SIM_FORMAT_CHOICES = (
        ('Nano-SIM', 'Nano-SIM'),
        ('Micro-SIM', 'Micro-SIM'),
    )

    SCREEN_DESIGN_CHOICES = (
        ('С рамкой', 'С рамкой'),
        ('Без рамки', 'Без рамки'),
    )
    BODY_TYPE_CHOICES = (
        ('Классический', 'Классический'),
        ('Слайдер', 'Слайдер'),
        ('Складной', 'Складной'),
    )

    BODY_MATERIAL_CHOICES = (
        ('Металл', 'Металл'),
        ('Стекло', 'Стекло'),
        ('Пластик', 'Пластик'),
    )
    OS_CHOICES = (
        ('iOS', 'iOS'),
        ('Android', 'Android'),
    )

    device = GenericRelation(Device, related_query_name="phone")
    product_type = models.CharField(verbose_name="Тип товара", max_length=25, default='phone')

    # Общие параметры
    phone_model = models.CharField(verbose_name='Модель', max_length=256)
    code = models.CharField(verbose_name='Код производителя', max_length=256)
    
    # Внешний вид
    back_color = models.CharField(verbose_name='Цвет задней панели', max_length=25)
    side_color = models.CharField(verbose_name='Цвет граней', max_length=25)
    declared_color = models.CharField(verbose_name='Цвет, заявленный производителем', max_length=25)
    
    # Заводские данные
    warranty = models.IntegerField(verbose_name='Гарантия продавца, мес', null=True, blank=True)

    # Мобильная связь
    physical_sim_count = models.IntegerField(verbose_name='Количество физических SIM-карт', default=0)
    esim_count = models.IntegerField(verbose_name='Количество eSIM', default=0)
    sim_format = models.CharField(verbose_name='Формат SIM-карт', choices=SIM_FORMAT_CHOICES, default='Nano-SIM', max_length=25)

    # Экран
    refresh_rate = models.IntegerField(verbose_name='Частота обновления экрана', default=60)
    ppi = models.IntegerField(verbose_name='Плотность пикселей', default=400)
    aspect_ratio = models.CharField(verbose_name='Соотношение сторон', default='16:9', max_length=25)
    color_depth = models.FloatField(verbose_name='Количество цветов экрана, млн', default='16', max_length=25)
    screen_design = models.CharField(verbose_name='Конструктивные особенности экрана', choices=SCREEN_DESIGN_CHOICES, default='Без рамки', max_length=25)
    screen_diagonal = models.FloatField(verbose_name='Диагональ экрана (дюйм)', default=0)

    # Конструкция и защита
    body_type = models.CharField(verbose_name='Тип корпуса', choices=BODY_TYPE_CHOICES, default='Классический', max_length=25)
    body_material = models.CharField(verbose_name='Материал корпуса', choices=BODY_MATERIAL_CHOICES, default='Металл', max_length=25)

    # Система
    os = models.CharField(verbose_name='Операционная система', choices=OS_CHOICES, default='ios', max_length=25)
    os_version = models.CharField(verbose_name='Версия ОС', default='ios17', max_length=30)
    processor_model = models.CharField(verbose_name='Модель процессора', max_length=256)
    number_of_cores = models.IntegerField(verbose_name='Количество ядер', default=0)
    max_processor_frequency = models.FloatField(verbose_name='Максимальная частота процессора, ГГц', default=0)

    # Оперативная память
    ram_type = models.CharField(verbose_name='Тип оперативной памяти', default='lpddr5', max_length=25)
    ram_capacity = models.IntegerField(verbose_name='Объем оперативной памяти, ГБ', default=8)
    virtual_ram = models.BooleanField(verbose_name='Виртуальное расширение ОЗУ', default=False)
    internal_storage = models.IntegerField(verbose_name='Объем встроенной памяти, ГБ', default=0)

    # Камера
    main_camera_count = models.IntegerField(verbose_name='Количество основных (тыловых) камер', default=2)
    main_camera_resolution = models.CharField(verbose_name='Количество мегапикселей основной камеры, МП', default=0, max_length=50)

    class Meta:
        verbose_name = 'телефон'
        verbose_name_plural = 'телефоны'

    
class Computer(DeviceBase):
    """
    Модель, описывающая характеристики компьютеров
    """
    MATERIAL_TYPES = [
        ('Нет данных', 'Нет данных'),
        ('Пластик', 'Пластик'),
        ('Металл', 'Металл'),
    ]

    MEMORY_TYPES = [
        ('Нет данных', 'Нет данных'),
        ('DDR3', 'DDR3'),
        ('DDR4', 'DDR4'),    
        ('DDR5', 'DDR5'),    
    ]
    device = GenericRelation(Device, related_query_name="computer")
    product_type = models.CharField(verbose_name="Тип товара", max_length=25, default='computer')

    # Внешний вид
    material = models.CharField(choices=MATERIAL_TYPES, default='Нет данных', max_length=100)

    # Устройства ввода
    fingerprint_scanner = models.BooleanField('Сканер отпечатка пальца', default=False)
    mechanical_keyboard = models.BooleanField('Механическая клавиатура', default=False)
    waterproof_keyboard = models.BooleanField('Влагозащищенная клавиатура', default=False)

    # Экран
    screen_diagonal = models.FloatField('Диагональ экрана (дюйм)', default=0)
    touch_screen = models.BooleanField('Сенсорный экран', default=False)

    # Процессор
    processor_model = models.CharField('Модель процессора', max_length=256)
    total_number_cores = models.IntegerField('Общее количество ядер', default=1)
    processor_frequency = models.FloatField('Частота процессора, ГГц ', default=0)

    # Оперативная память
    memory_type = models.CharField(choices=MEMORY_TYPES, default='Нет данных', max_length=10)
    amount_RAM = models.IntegerField('Объем оперативной памяти', default=0)
    max_amount_RAM = models.IntegerField('Максимальный объем оперативной памяти, Гб', default=0)

    # Накопители данных
    total_volume_SSD = models.IntegerField('Общий объем твердотельных накопителей (SSD), Гб', default=0)

    class Meta:
        verbose_name = 'компьютер'
        verbose_name_plural = 'компьютеры'