# Generated by Django 3.0.7 on 2020-06-16 04:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('requests', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='request',
            old_name='isAnswered',
            new_name='is_answered',
        ),
        migrations.RenameField(
            model_name='request',
            old_name='isSolved',
            new_name='is_solved',
        ),
    ]