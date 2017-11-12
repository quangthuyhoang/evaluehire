from django.shortcuts import render
from django.http import HttpResponse

from employee.models import *
from employee.forms import *


# Create your views here.
def index(request):
    return HttpResponse('index!')


def list(request, id):
    employee = EmployeeInfo.objects.get(id=id)
    context_dic = {
        'employee': employee,

    }
    # return HttpResponse('employee# %s list' % id)
    return render(request, 'employee/employee.html', context_dic)