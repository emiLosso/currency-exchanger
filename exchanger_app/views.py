# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from models import Currency, Wallet, Transaction
from serializers import UserSerializer, CurrencySerializer, WalletSerializer, TransactionSerializer
from rest_framework import permissions
from rest_framework import viewsets
from django.views import generic
from django.shortcuts import render
from rest_framework.decorators import list_route
from rest_framework.response import Response


class AppView(generic.View):
    template_name = "exchanger_app/index.html"

    def get(self, request, *args, **kwargs):
        ctx = {}
        return render(request, self.template_name, ctx)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)


class CurrencyViewSet(viewsets.ModelViewSet):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer
    permission_classes = (permissions.IsAuthenticated,)

    # currencies that a logged user hasn't in your wallets
    @list_route()
    def havent_currencies(self, request):
        user_currencies = Wallet.objects.filter(
            user=request.user).values_list('currency', flat=True)
        currencies = Currency.objects.exclude(pk__in=user_currencies)

        if currencies:
            serializer = self.get_serializer(currencies, many=True)
            return Response(serializer.data)

        return Response([])


class WalletViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Wallet.objects.filter(user=user)


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = (permissions.IsAuthenticated,)
