from rest_framework import serializers
from .models import Laptop, Graphics_Card,Monitor,Console


class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    image = serializers.ImageField()
    brand = serializers.CharField(max_length=100)
    price = serializers.CharField(max_length=100)
    product_type = serializers.SerializerMethodField()

    def get_product_type(self, obj):
        if isinstance(obj, Laptop):
            return 'laptop'
        elif isinstance(obj, Graphics_Card):
            return 'graphics_card'
        return 'unknown'

class LaptopSerializer(serializers.ModelSerializer):
    product_type = serializers.SerializerMethodField()
    
    class Meta:
        model = Laptop
        fields = '__all__'
    
    def get_product_type(self, obj):
        return 'laptop'

class GPU_Serializer(serializers.ModelSerializer):
    product_type = serializers.SerializerMethodField()

    class Meta:
        model = Graphics_Card
        fields = '__all__'       

    def get_product_type(self, obj):
        return 'graphics_card'

class MonitorSerializer(serializers.ModelSerializer):
    product_type = serializers.SerializerMethodField()

    class Meta:
        model = Monitor
        fields = '__all__'
    
    def get_product_type(self, obj):
        return 'monitor'
    

class ConsoleSerializer(serializers.ModelSerializer):
    product_type = serializers.SerializerMethodField()

    class Meta:
        model = Console
        fields = '__all__'
    
    def get_product_type(self, obj):
        return 'console'