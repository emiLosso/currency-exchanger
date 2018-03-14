# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from models import Currency, Wallet, Transaction
from serializers import UserSerializer, CurrencySerializer, WalletSerializer, TransactionSerializer

from rest_framework import permissions
from rest_framework import viewsets
from django_filters import rest_framework


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)


class CurrencyViewSet(viewsets.ModelViewSet):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer
    permission_classes = (permissions.IsAuthenticated,)


class WalletViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = (rest_framework.DjangoFilterBackend,)
    filter_fields = ('user__username',)

    def get_queryset(self):
        user = self.request.user
        return Wallet.objects.filter(user=user)


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = (permissions.IsAuthenticated,)
