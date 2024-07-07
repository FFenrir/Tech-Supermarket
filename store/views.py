from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import Laptop, Graphics_Card
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import LaptopSerializer, GPU_Serializer
from django.db.models import Q

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