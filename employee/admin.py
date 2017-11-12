from django.contrib import admin
from employee.models import EmployeeInfo, Ratings


class EmployeeInfoAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'gender', 'email', 'job_title')


class RatingAdmin(admin.ModelAdmin):
    list_display = ('id', 'employee_id', 'metrics', 'reviews', 'descriptions')


admin.site.register(EmployeeInfo, EmployeeInfoAdmin)
admin.site.register(Ratings)
# Register your models here.
