from .models import FileModel

class FileSelector:

    def get_file(self, uuid) -> FileModel:
        file = FileModel.objects.get(id=uuid)
        return file