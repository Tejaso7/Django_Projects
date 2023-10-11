from django.shortcuts import render,HttpResponse,redirect

# Create your views here.
def homepage(request):
    return render(request,'homepage.html')

def clientside(request):
    return render(request,'clientside.html')

def adminside(request):
    return render(request,'adminside.html')

def dashboardmain(request):
    return render(request,'dashboardmain.html')

