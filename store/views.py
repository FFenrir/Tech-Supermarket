from django.shortcuts import render
from rest_framework import generics
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.cache import cache
from django.apps import apps
from rest_framework.views import APIView
from .models import Laptop, Graphics_Card
from .serializers import LaptopSerializer, GPU_Serializer
from rest_framework.permissions import AllowAny

from rest_framework.response import Response

# Create your views here.

class LaptopView(generics.ListCreateAPIView):
    queryset = Laptop.objects.all()
    serializer_class = LaptopSerializer

class LaptopDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Laptop.objects.all()
    serializer_class = LaptopSerializer

class GPU_View(generics.ListCreateAPIView):
    queryset = Graphics_Card.objects.all()
    serializer_class = GPU_Serializer

class GPU_Detail_View(generics.RetrieveUpdateDestroyAPIView):
    queryset = Graphics_Card.objects.all()
    serializer_class = GPU_Serializer


class AllProductsView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, format=None):

        store = request.query_params.get('store', None)

        laptops = Laptop.objects.all()
        graphics_cards = Graphics_Card.objects.all()

        laptop_serializer = LaptopSerializer(laptops, many=True)
        graphics_card_serializer = GPU_Serializer(graphics_cards, many=True)

        # If a store filter is provided, apply it to both querysets
        if store:
            laptops = laptops.filter(store__iexact=store)
            graphics_cards = graphics_cards.filter(store__iexact=store)

        # Serialize the filtered querysets
        laptop_serializer = LaptopSerializer(laptops, many=True)
        graphics_card_serializer = GPU_Serializer(graphics_cards, many=True)


        # Combine the serialized data
        combined_data = laptop_serializer.data + graphics_card_serializer.data

        return Response(combined_data, status=status.HTTP_200_OK)


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