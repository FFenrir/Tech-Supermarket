from django.urls import path,include
from .views import LaptopView, LaptopDetailView, GPU_View, GPU_Detail_View,AllProductsView,StoreListView
from .models import Laptop, Graphics_Card

from rest_framework.routers import DefaultRouter


router = DefaultRouter()
#router.register(r'compare', CompareViewSet, basename='compare')

urlpatterns = [
    path('laptops/', LaptopView.as_view(), name='laptop-list'),
    path('laptops/<int:pk>/', LaptopDetailView.as_view(), name='laptop-detail'),
    path('graphics_cards/', GPU_View.as_view(), name='gpu-list'),
    path('graphics_cards/<int:pk>/', GPU_Detail_View.as_view(), name='gpu-detail'),
    path('all_products', AllProductsView.as_view(), name='all-products'),
    path('stores', StoreListView.as_view(), name='store-filters'),
    path('', include(router.urls)),  # Include the router's URLs
]