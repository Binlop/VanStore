from rest_framework.response import Response
from rest_framework.views import APIView
from .selector import FileSelector
from rest_framework import status
from django.http import HttpResponse, HttpResponseNotFound

class FileView(APIView):
    def get(self, request, uuid):
        selector = FileSelector()
        file = selector.get_file(uuid=uuid)
        if file is not None:
            return Response(file, content_type='image/png')
        else: return HttpResponseNotFound('Изображение не найдено')
