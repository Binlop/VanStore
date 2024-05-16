from rest_framework.response import Response
from rest_framework.views import APIView
from .selector import FileSelector
from rest_framework import status
from django.http import HttpResponse, HttpResponseNotFound
from django.http import HttpResponse, HttpResponseNotFound
from .models import FileModel
from django.core.exceptions import ObjectDoesNotExist


class FileView(APIView):

    def get(self, request, uuid):
        selector = FileSelector()
        file = selector.get_file(uuid=uuid)
        if file is not None:
            return HttpResponse(file.file, content_type='image/png')
