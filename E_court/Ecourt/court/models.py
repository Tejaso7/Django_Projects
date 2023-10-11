from django.db import models

# Create your models here.
class Lawyer(models.Model):
    # Personal Information
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    contact_number = models.CharField(max_length=20)
    email = models.EmailField()

    # Address
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)

    # Professional Information

    years_of_experience = models.PositiveIntegerField()

