from django.contrib import admin
from .models import Phone, Computer

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