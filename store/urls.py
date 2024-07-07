from django.urls import path
from .views import LaptopView, LaptopDetailView, GPU_View, GPU_Detail_View
from .models import Laptop, Graphics_Card



urlpatterns = [
    path('laptops', LaptopView.as_view(), name='laptop-list' ),
    path('<int:pk>', LaptopDetailView.as_view(), name='laptop-details'),
    path('graphics_cards', GPU_View.as_view(), name='GPU-list'),
    path('graphics_cards/<int:pk>', GPU_Detail_View.as_view(), name='GPU-detail'),
]