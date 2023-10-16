from django.urls import path, include
from . import views

urlpatterns = [
    # URLS for General User to see vehicle details
    path('', views.home, name="home"),
    path('home/', views.home, name="home"),

    # URLS for Registering and logging user
    path('login/', views.login, name="login"),
    path('register/', views.Register.as_view(), name="register"),

    # URLS for CRUD ( Create, Retrieve, Update, Delete)
    path('add_vehicle/', views.add_vehicle, name ="add_vehicle"),
    path('store/', views.store, name="store"),
    path('edit_vehicle/<int:pk>', views.edit_vehicle, name="edit_vehicle"),
    path('edit/<int:pk>', views.edit, name="edit"),
    path('delete_vehicle/<int:pk>', views.delete_vehicle, name="delete_vehicle"),

]
