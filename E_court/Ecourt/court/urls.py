from django.urls import path
from . import views
urlpatterns = [

    path('',views.homepage,name='homepage'),
    path('c/',views.clientside,name='clientside'),
    path('a/',views.adminside,name='adminside'),
    path('d/',views.dashboardmain,name='dashboardmain')
]
