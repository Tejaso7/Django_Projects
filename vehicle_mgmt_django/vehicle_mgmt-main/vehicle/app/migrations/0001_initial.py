# Generated by Django 4.1.2 on 2022-10-28 09:30

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vehicle_number', models.TextField(max_length=100, validators=[django.core.validators.RegexValidator('^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')])),
                ('vehicle_type', models.CharField(max_length=50)),
                ('vehicle_model', models.TextField()),
                ('vehicle_description', models.TextField()),
            ],
        ),
    ]
