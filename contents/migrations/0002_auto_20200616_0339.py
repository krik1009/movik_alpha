# Generated by Django 3.0.7 on 2020-06-16 03:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tags', '0001_initial'),
        ('contents', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='content',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='uploaded_contents', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='content',
            name='tags',
            field=models.ManyToManyField(blank=True, related_name='tagged_contents', to='tags.Tag'),
        ),
    ]