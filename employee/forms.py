from django import forms
from employee.models import *


class EmployeeInfoForm(forms.ModelForm):
    class Meta:
        model = EmployeeInfo
        fields = ['first_name', 'last_name', 'email', 'job_title']


class RatingForm(forms.ModelForm):
    class Meta:
        model = Ratings
        fields = ['metrics', 'reviews', 'description']