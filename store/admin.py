from django.contrib import admin
from .models import Laptop,Graphics_Card

# Register your models here.


class LaptopAdmin(admin.ModelAdmin):
    
    model = Laptop
    list_display = ['name', 'brand', 'price']

class GPU_Admin(admin.ModelAdmin):
    
    model = Graphics_Card
    list_display = ['name', 'brand', 'price']



admin.site.register(Laptop,LaptopAdmin)
admin.site.register(Graphics_Card,GPU_Admin)