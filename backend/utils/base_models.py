from django.db import models

class BaseModel(models.Model):
    created_at = models.DateTimeField(verbose_name='Создан', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='Изменен', auto_now=True)

    class Meta:
        abstract = True