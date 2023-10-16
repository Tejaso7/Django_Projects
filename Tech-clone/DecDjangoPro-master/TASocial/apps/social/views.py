from django.contrib.auth import authenticate, login, logout as auth_logout
from django.shortcuts import render, redirect, HttpResponseRedirect, reverse

from .forms import SignUpForm, LoginForm
from .models import Student, Profile, User, Jobs


def login_view(request):
    form = LoginForm(request.POST or None)
    msg = None
    if request.method == 'POST':
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            # print('User name :', user.username)
            # return redirect('index')
            # print('department :', user.department)
            if user is not None and user.type_user == "Student":
                login(request, user)
                return redirect('index')
            elif user is not None and user.type_user == "Staff":
                login(request, user)
                return redirect('student_details')
            else:
                msg = 'invalid credentials'
        else:
            msg = 'error validating form'
    return render(request, 'login.html', {'form': form, 'msg': msg})


def register(request):
    msg = None
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            msg = 'user created'
            return redirect('login_view')
        else:
            msg = 'form is not valid'
    else:
        form = SignUpForm()
    return render(request, 'register.html', {'form': form, 'msg': msg})


#
def logout(request):
    if request.user.is_authenticated:
        auth_logout(request)
    return HttpResponseRedirect(reverse('login_view'))
    # return redirect('login_view')


# Create your views here.
# def contact(request):
#     return HttpResponse('''This is contact HTTP Response''')

# CRUD
# Create a Entry in DB
# Read the Entries from DB
# Update the Entries from DB
# Delete the Entries from DB
def store_student(request):
    s = Student()
    s.name_student = request.POST.get('student_name')
    s.name_college = request.POST.get('clg_name')
    s.department = request.POST.get('department')
    s.year_pass = request.POST.get('year')
    s.mobile = request.POST.get('mobile')
    s.save()
    return redirect('student_details')


def student_details(request):
    show = Student.objects.all()
    return render(request, 'student_details.html', {'data': show})


def edit_student(request, pk):
    show = Student.objects.get(id=pk)
    return render(request, 'edit_details.html', {'data': show})


def edit_details(request, pk):
    s = Student.objects.get(id=pk)
    s.name_student = request.POST.get('student_name')
    s.name_college = request.POST.get('clg_name')
    s.department = request.POST.get('department')
    s.year_pass = request.POST.get('year')
    s.mobile = request.POST.get('mobile')
    s.save()
    return redirect('student_details')


def delete_student(request, pk):
    s = Student.objects.get(id=pk)
    s.delete()
    return redirect('student_details')


def add_student(request):
    return render(request, 'add_student.html')


def home(request):
    return render(request, 'index.html')


def posts(request):
    return render(request, 'post.html')


def profile(request):
    return render(request, 'profile.html')


def add_profile(request):
    p = Profile()
    p.name = request.POST.get('name')
    p.mobile_no = request.POST.get('mobile_no')
    p.mail_id = request.POST.get('mail_id')
    p.address = request.POST.get('address')
    p.department = request.POST.get('department')

    # to store ForeignKey
    uid = request.user.id
    user_id = User.objects.get(id=uid)
    p.user = user_id
    p.save()
    return redirect('index')


def about(request):
    return render(request, 'about.html')

def jobs(request):
    jobs = Jobs.objects.all()
    return render(request, 'jobs.html', {'jobs':jobs})


def add_jobs(request):
    if request.method == 'POST':
        job = Jobs()
        job.title = request.POST.get('title')
        job.company_name = request.POST.get('company_name')
        job.description = request.POST.get('description')
        job.link = request.POST.get('link')
        job.save()
        return redirect('jobs')
    return render(request, 'add_jobs.html')

#  View User Profiles
def show_profile(request):

    return render(request, 'show_profile.html')
