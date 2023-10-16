from django.contrib import messages
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView

from .models import UserRegisterForm
from .models import Vehicle
from .models import Model_Choices


# Create your views here.
def login(request):
    return HttpResponseRedirect("/accounts/login")


class Register(CreateView):
    form_class = UserRegisterForm
    success_url = reverse_lazy("login")
    template_name = "registration.html"


def home(request):
    vehicles = Vehicle.objects.all()
    return render(request, 'home.html', {'vehicles': vehicles})


# to show add vehicle HTML page
def add_vehicle(request):
    return render(request, 'add_vehicle.html', {'Model_Choices':Model_Choices})


# to store vehicle details
def store(request):
    v = Vehicle()
    v.vehicle_type = request.POST.get('vehicle_type')
    v.vehicle_model = request.POST.get('vehicle_model')
    v.vehicle_number = request.POST.get('vehicle_number')
    v.vehicle_description = request.POST.get('vehicle_description')
    v.save()
    messages.success(request, "Vehicle Details Added Successfully")
    return redirect('home')


# to see edit page of vehicle
def edit_vehicle(request, pk):
    vehicles = Vehicle.objects.get(id=pk)
    return render(request, 'update.html', {'vehicles': vehicles,'Model_Choices':Model_Choices})


# to edit the details and save
def edit(request, pk):
    v = Vehicle.objects.get(id=pk)
    v.vehicle_type = request.POST.get('vehicle_type')
    v.vehicle_model = request.POST.get('vehicle_model')
    v.vehicle_number = request.POST.get('vehicle_number')
    v.vehicle_description = request.POST.get('vehicle_description')
    v.save()
    messages.success(request, "Vehicle Details Updated Successfully")
    return redirect('/home')


# to delete the vehicle details
def delete_vehicle(request, pk):
    v = Vehicle.objects.get(id=pk)
    v.delete()
    messages.success(request, "Student deleted Successfully")
    return redirect('/home')
