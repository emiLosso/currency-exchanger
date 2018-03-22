# -*- coding: utf-8 -*-
# from __future__ import unicode_literals
from rest_framework.test import APITestCase
from rest_framework import status

from rest_framework.test import APIClient
from django.core.urlresolvers import reverse

from models import Currency, Wallet
from django.contrib.auth.models import User
import datetime


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
        self.currency = self.create_currency("Bitcoin", "B")

    def create_currency(self, name, sign):
        c = Currency()
        c.name = name
        c.sign = sign
        c.save()

    def create_wallet(self, currency, user, balance):
        w = Wallet()
        w.currency = currency
        w.user = user
        w.balance = balance

    def create_user(self, email, user, password):
        User.objects.create_user(
            user, email, password)

    def test_api_can_create_a_currency(self):
        """Test the api has currency creation capability."""
        self.currency_data = {'name': 'New Currency', 'sign': 'N'}
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

    def test_api_can_create_a_transaction(self):
        """Test the api has transaction creation capability."""
        user1 = User.objects.create_user("user1", "user1@user.com", "admin123")
        user2 = User.objects.create_user("user2", "user2@user.com", "admin123")
        currency1 = Currency.objects.create(
            name="Dogecoin",
            sign="D",
        )
        wallet1 = Wallet.objects.create(
            currency=currency1,
            user=user1,
            balance="1000",
        )
        wallet2 = Wallet.objects.create(
            currency=currency1,
            user=user2,
            balance="1000",
        )

        self.transaction_data = {
            "amount": 20,
            "date_time": datetime.datetime.now(),
            "origin": {
                "id": wallet1.pk,
                "balance": wallet1.balance,
                "currency": {
                    "id": currency1.pk,
                    "name": currency1.name,
                    "sign": currency1.sign
                },
                "user": {
                    "id": user1.pk,
                    "username": user1.username
                }
            },
            "destination": {
                "id": wallet2.pk,
                "balance": wallet2.balance,
                "currency": {
                    "id": currency1.pk,
                    "name": currency1.name,
                    "sign": currency1.sign
                },
                "user": {
                    "id": user2.pk,
                    "username": user2.username
                }
            }
        }

        self.response = self.client.post(
            reverse('api:transactions-list'),
            self.transaction_data,
            format="json",
        )
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
