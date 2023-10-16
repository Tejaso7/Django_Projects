from django.db import models
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from django.core.validators import RegexValidator

alphanumeric = RegexValidator(r'^[a-zA-Z0-9\s]+', 'Only alphanumeric characters are allowed.')

# Create your models here.
Model_Choices = (
    'Two wheeler',
    'Three Wheeler',
    'Four Wheeler'
)


class Vehicle(models.Model):
    vehicle_number = models.TextField(max_length=100, validators=[alphanumeric])
    vehicle_type = models.CharField(max_length=50)
    vehicle_model = models.TextField()
    vehicle_description = models.TextField()


class UserRegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'password1', 'password2']
