# Generated by Django 3.0.7 on 2020-07-11 06:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contents', '0004_auto_20200711_0201'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='content',
            name='duration',
        ),
    ]
