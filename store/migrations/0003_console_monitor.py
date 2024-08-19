# Generated by Django 5.0.6 on 2024-08-13 11:25

import store.utils
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_graphics_card_base_clock_speed_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Console',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('store', models.CharField(max_length=255)),
                ('product_link', models.CharField(blank=True, max_length=1000)),
                ('name', models.CharField(max_length=100)),
                ('image', models.ImageField(upload_to=store.utils.get_image_path)),
                ('brand', models.CharField(max_length=100)),
                ('price', models.CharField(max_length=100)),
                ('game_in_buble', models.CharField(blank=True, max_length=100)),
                ('controller', models.CharField(max_length=100)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Monitor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('store', models.CharField(max_length=255)),
                ('product_link', models.CharField(blank=True, max_length=1000)),
                ('name', models.CharField(max_length=100)),
                ('image', models.ImageField(upload_to=store.utils.get_image_path)),
                ('brand', models.CharField(max_length=100)),
                ('price', models.CharField(max_length=100)),
                ('monitor_series', models.CharField(max_length=100)),
                ('monitor_display_size', models.CharField(max_length=100)),
                ('monitor_display_type', models.CharField(max_length=100)),
                ('monitor_display_resolution', models.CharField(max_length=100)),
                ('monitor_display_aspect_ration', models.CharField(max_length=100)),
                ('monitor_display_refresh_rate', models.CharField(max_length=100)),
                ('monitor_hdr', models.CharField(max_length=100)),
                ('monitor_display_ports', models.CharField(max_length=100)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
