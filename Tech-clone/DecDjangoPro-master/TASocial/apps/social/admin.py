from django.contrib import admin
from .models import Student, College, User, Posts, Jobs, Profile

# Register your models here.
admin.site.register(Student)
# admin.site.register(Teacher)
admin.site.register(College)

# updated
admin.site.register(User)
admin.site.register(Posts)
admin.site.register(Jobs)
admin.site.register(Profile)
