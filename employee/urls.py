from django.conf.urls import url
from employee import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'listemployeeinfo/id=(?P<id>[\w]+)/$', views.list, name='list_employeeinfo')
]