from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("user", "first_name", 'last_name', 'username', 'email', 'is_manager', )
    list_filter = ("user", 'username', 'email')
    search_fields = ("user__startswith", "username__startswith", "email__startswith")