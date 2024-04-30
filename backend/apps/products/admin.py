from django.contrib import admin
from .models import Device, Phone, Computer

@admin.register(Device)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("id", "content_object")
    list_filter = ("id", )
    search_fields = ("id__startswith",)

@admin.register(Phone)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("name", "description")
    list_filter = ("name", )
    search_fields = ("name__startswith", "description__startswith")

@admin.register(Computer)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("name", "description")
    list_filter = ("name", )
    search_fields = ("name__startswith", "description__startswith")