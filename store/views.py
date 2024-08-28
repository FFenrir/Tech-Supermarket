from django.shortcuts import render
from rest_framework import generics
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.cache import cache
from django.apps import apps
from rest_framework.views import APIView
from .models import Laptop, Graphics_Card,Monitor,Console
from .serializers import LaptopSerializer, GPU_Serializer,MonitorSerializer,ConsoleSerializer
from rest_framework.permissions import AllowAny
import random
import logging
logger = logging.getLogger(__name__)



from rest_framework.response import Response

# Create your views here.

class StoreListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Get unique store names from Laptop model
        laptop_stores = Laptop.objects.values_list('store', flat=True).distinct()
        # Get unique store names from Graphics_Card model
        gpu_stores = Graphics_Card.objects.values_list('store', flat=True).distinct()
        # Combine the two sets of store names
        all_stores = set(laptop_stores) | set(gpu_stores)
        # Return the sorted list of unique store names
        return Response(sorted(all_stores, key=str.lower))

#Laptop
class LaptopView(generics.ListCreateAPIView):
    queryset = Laptop.objects.all()
    serializer_class = LaptopSerializer


class LaptopDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Laptop.objects.all()
    serializer_class = LaptopSerializer

#GPU
class GPU_View(generics.ListCreateAPIView):
    queryset = Graphics_Card.objects.all()
    serializer_class = GPU_Serializer


class GPU_Detail_View(generics.RetrieveUpdateDestroyAPIView):
    queryset = Graphics_Card.objects.all()
    serializer_class = GPU_Serializer

# Monitor
class MonitorView(generics.ListAPIView):
    queryset = Monitor.objects.all()
    serializer_class = MonitorSerializer

class MonitorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Monitor.objects.all()
    serializer_class = MonitorSerializer

#Console
class ConsoleView(generics.ListAPIView):
    queryset = Console.objects.all()
    serializer_class = ConsoleSerializer

class ConsoleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Console.objects.all()
    serializer_class = ConsoleSerializer

# All products
class AllProductsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        store = request.query_params.get('store', None)

        # Get all laptops and graphics cards
        laptops = Laptop.objects.all()
        graphics_cards = Graphics_Card.objects.all()
        monitors = Monitor.objects.all()
        consoles = Console.objects.all()

        # If a store filter is provided, apply it to both querysets
        if store:
            laptops = laptops.filter(store__iexact=store)
            graphics_cards = graphics_cards.filter(store__iexact=store)
            monitors = monitors.filter(store__iexact=store)
            consoles = consoles.filter(store__iexact=store)

        # Serialize the products with context to include request for building absolute URIs
        laptops_serialized = LaptopSerializer(laptops, many=True, context={'request': request}).data
        graphics_cards_serialized = GPU_Serializer(graphics_cards, many=True, context={'request': request}).data
        monitors_serialized = MonitorSerializer(monitors, many=True, context={'request':request}).data
        consoles_serialized = ConsoleSerializer(consoles, many=True, context={'request':request}).data
        # Combine the products
        all_products = laptops_serialized + graphics_cards_serialized + monitors_serialized + consoles_serialized



        # Shuffle the products
        random.shuffle(all_products)
        logger.info(all_products)
        return Response(all_products, status=status.HTTP_200_OK)
