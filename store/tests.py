from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Laptop

# Create your tests here.
class ProductCompareViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Create some test Laptop instances
        self.laptop1 = Laptop.objects.create(
            name='Laptop 1',
            store='Amazon',
            price='1000$',
            # Add other required fields
        )
        self.laptop2 = Laptop.objects.create(
            name='Laptop 2',
            store='B&H',
            price='1200$',
            # Add other required fields
        )

    def test_compare_laptops(self):
        url = '/store/compare'
        laptop_ids = [self.laptop1.id, self.laptop2.id]
        response = self.client.get(url, {'laptop_ids': laptop_ids}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Assert that response.data contains expected serialized laptop data

    def test_compare_laptops_not_found(self):
        url = '/store/compare'
        laptop_ids = [9999, 8888]  # IDs that do not exist
        response = self.client.get(url, {'laptop_ids': laptop_ids}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        # Assert that response.data contains expected error message