# Generated by Django 3.0.7 on 2020-06-28 03:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0003_auto_20200628_0325'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_image',
            field=models.CharField(default='https://i.ya-webdesign.com/images/default-image-png-1.png', max_length=500),
        ),
    ]
