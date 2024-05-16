from django.db import models
import uuid

class FileModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    file = models.FileField(verbose_name='Изображение товара', upload_to='products/images/')

    def __str__(self):
        return str(self.file)    
