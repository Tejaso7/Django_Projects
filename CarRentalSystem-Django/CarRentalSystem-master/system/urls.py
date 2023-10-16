from django.urls import re_path as url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^$', views.home, name = "home"),

    url(r'^carlist/$', views.car_list, name = "car_list"),
    url(r'^createOrder/$', views.order_created, name = "order_create"),

    url(r'^(?P<id>\d+)/edit/$',  views.car_update, name = "car_edit"),


    url(r'^(?P<id>\d+)/$',  views.car_detail, name = "car_detail"),
    url(r'^detail/(?P<id>\d+)/$',  views.order_detail, name = "order_detail"),

    url(r'^(?P<id>\d+)/delete/$',  views.car_delete, name = "car_delete"),
    url(r'^(?P<id>\d+)/deleteOrder/$',  views.order_delete, name = "order_delete"),

    url(r'^contact/$',   views.contact , name = "contact"),

    url(r'^newcar/$',   views.newcar, name = "newcar"),
    url(r'^(?P<id>\d+)/like/$',  views.like_update, name = "like"),
    url(r'^popularcar/$', views.popular_car, name = "popularcar"),

]
