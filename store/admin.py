from django.contrib import admin
from .models import Laptop, Graphics_Card, Monitor, Console

# Register your models here.


class LaptopAdmin(admin.ModelAdmin):
    
    model = Laptop
    list_display = ['name', 'store', 'price']

class GPU_Admin(admin.ModelAdmin):
    
    model = Graphics_Card
    list_display = ['name', 'store', 'price']

class MonitorAdmin(admin.ModelAdmin):

    model = Monitor
    list_display = ['name', 'store', 'price']

class ConsoleAdmin(admin.ModelAdmin):
    
    model = Console
    list_display = ['name', 'store', 'price']



admin.site.register(Laptop, LaptopAdmin)
admin.site.register(Graphics_Card, GPU_Admin)
admin.site.register(Monitor, MonitorAdmin)
admin.site.register(Console, ConsoleAdmin)