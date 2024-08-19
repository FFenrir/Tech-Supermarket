from django.db import models
from django.urls import reverse
from .utils import get_image_path
from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile
from django.db.models.signals import pre_save
from django.dispatch import receiver

# Create your models here.



class ProductBaseModel(models.Model):
    store = models.CharField(max_length=255)
    product_link = models.CharField(max_length=1000, blank=True)
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to=get_image_path)
    brand = models.CharField(max_length=100)
    price = models.CharField(max_length=100)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('product_detail', args=[str(self.id)])  # Assuming a generic detail view

    

class Laptop(ProductBaseModel):
    series = models.CharField(max_length=100)
    processor = models.CharField(max_length=100)
    processor_brand = models.CharField(max_length=100)
    ram = models.CharField(max_length=100)
    hard_drive = models.CharField(max_length=100)
    graphics_processor = models.CharField(max_length=100)
    chipset_brand = models.CharField(max_length=100)
    item_model_number = models.CharField(max_length=100, blank=True)
    screen_display_size = models.CharField(max_length=100)
    screen_resolution = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    # No need for a separate get_absolute_url since it inherits from ProductBaseModel

class Graphics_Card(ProductBaseModel):
    series = models.CharField(max_length=100)
    graphics_coprocessor = models.CharField(max_length=100)
    chipset_brand = models.CharField(max_length=100)
    memory_interface = models.CharField(max_length=100, blank=True)
    base_clock_speed = models.CharField(max_length=100, blank=True)
    graphics_card_ram_size = models.CharField(max_length=100)
    item_dimensions = models.CharField(max_length=100)
    item_weight = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Monitor(ProductBaseModel):
    monitor_series = models.CharField(max_length=100)
    monitor_display_size = models.CharField(max_length=100)
    monitor_display_type = models.CharField(max_length=100)
    monitor_display_resolution = models.CharField(max_length=100)
    monitor_display_aspect_ration = models.CharField(max_length=100)
    monitor_display_refresh_rate = models.CharField(max_length=100)
    monitor_hdr = models.CharField(max_length=100)
    monitor_display_ports = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Console(ProductBaseModel):
    game_in_buble = models.CharField(max_length=100,blank=True)
    controller = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name