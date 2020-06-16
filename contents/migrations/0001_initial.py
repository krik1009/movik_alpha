# Generated by Django 3.0.7 on 2020-06-16 03:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('categories', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Content',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('thumbnail', models.CharField(max_length=500)),
                ('video', models.CharField(max_length=500)),
                ('description', models.CharField(blank=True, max_length=1000)),
                ('duration', models.DurationField(blank=True)),
                ('height', models.PositiveIntegerField(blank=True)),
                ('width', models.PositiveIntegerField(blank=True)),
                ('lang', models.CharField(choices=[('en', 'English'), ('sp', 'Spanish'), ('fr', 'French'), ('kr', 'Korean'), ('ma', 'Mandarin'), ('ja', 'Japanese')], default='en', max_length=2)),
                ('isEditorsChoice', models.BooleanField(default=False)),
                ('isSafeSearch', models.BooleanField(default=True)),
                ('color', models.CharField(choices=[('mlt', 'Multicolors'), ('grs', 'Grayscale'), ('trs', 'Transparent'), ('rd', 'Red'), ('or', 'Orange'), ('yl', 'Yellow'), ('grn', 'Green'), ('tqs', 'Turquoise'), ('bl', 'Blue'), ('llc', 'Lilac'), ('pk', 'Pink'), ('wh', 'White'), ('gry', 'Gray'), ('blk', 'Black'), ('br', 'Brown')], default='mlt', max_length=3)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('categories', models.ManyToManyField(blank=True, related_name='contents', to='categories.Category')),
            ],
        ),
    ]
