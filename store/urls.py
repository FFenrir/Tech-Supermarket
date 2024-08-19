from django.urls import path,include
from .views import LaptopView, LaptopDetailView, GPU_View, GPU_Detail_View,AllProductsView,MonitorView,MonitorDetailView,ConsoleView,ConsoleDetailView

from rest_framework.routers import DefaultRouter


router = DefaultRouter()
#router.register(r'compare', CompareViewSet, basename='compare')

urlpatterns = [
    #All products
    path('all_products', AllProductsView.as_view(), name='all-products'),
    #Latpops
    path('laptops/', LaptopView.as_view(), name='laptop-list'),
    path('laptops/<int:pk>', LaptopDetailView.as_view(), name='laptop-details'),
    #GPU
    path('graphics_cards/', GPU_View.as_view(), name='gpu-list'),
    path('graphics_cards/<int:pk>', GPU_Detail_View.as_view(), name='gpu-details'),
    #Monitor
    path('monitors/',MonitorView.as_view(), name='monitor-list'),
    path('monitors/<int:pk>', MonitorDetailView.as_view(), name='monitor-details'),
    #Console
    path('consoles/', ConsoleView.as_view(), name='console-list'),
    path('console/<int:pk>', ConsoleDetailView.as_view(), name='console-details'),
    
    path('', include(router.urls)),  # Include the router's URLs
]