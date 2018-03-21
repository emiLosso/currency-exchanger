# -*- coding: utf-8 -*-
# from __future__ import unicode_literals
from rest_framework.test import APITestCase
from rest_framework import status

from rest_framework.test import APIClient
from django.core.urlresolvers import reverse

from models import Currency
from django.contrib.auth.models import User


class ApiTestCase(APITestCase):

    def setUp(self):
        """Define the test client and other test variables."""
        self.email = 'username@example.com'
        self.username = 'username'
        self.password = 'password'
        self.user = User.objects.create_user(
            self.username, self.email, self.password)

        self.data = {
            'username': self.username,
            'password': self.password
        }
        self.client = APIClient()
        self.client.login(username=self.username, password=self.password)
        self.create_currency()

    def create_currency(self):
        c = Currency()
        c.name = "Bitcoin"
        c.sign = 'B'
        c.save()

    def test_api_can_create_a_currency(self):
        """Test the api has currency creation capability."""
        self.currency_data = {'name': 'Dogecoin', 'sign': 'D'}
        self.response = self.client.post(
            reverse('api:currencies-list'),
            self.currency_data,
            format="json",
        )
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_api_can_get_a_currency(self):
        """Test the api can get a given currency."""
        currency = Currency.objects.get(name="Bitcoin")
        response = self.client.get(
            reverse('api:currencies-detail',
                    kwargs={'pk': currency.id}), format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, currency)

    def test_api_can_update_currency(self):
        """Test the api can update a given currency."""
        currency = Currency.objects.get(name="Bitcoin")
        change_currency = {'name': 'new currency', 'sign': 'N!'}
        res = self.client.put(
            reverse('api:currencies-detail', kwargs={'pk': currency.id}),
            change_currency, format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_api_can_delete_currency(self):
        """Test the api can delete a currency."""
        currency = Currency.objects.get(name="Bitcoin")
        response = self.client.delete(
            reverse('api:currencies-detail', kwargs={'pk': currency.id}),
            format='json',
            follow=True)

        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)
