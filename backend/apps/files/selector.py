from .models import FileModel
from django.core.exceptions import ObjectDoesNotExist

class FileSelector:

    def get_file(self, uuid) -> FileModel:
        file = FileModel.objects.get(id=uuid)
        return file