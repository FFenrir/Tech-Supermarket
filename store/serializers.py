from rest_framework import serializers
from .models import Laptop, Graphics_Card




class LaptopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Laptop
        fields = '__all__'

class GPU_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Graphics_Card
        fields = '__all__'       

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