# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.utils.translation import ugettext as _
from django.db import models
from django.contrib.auth.models import User


class Currency(models.Model):
    name = models.CharField(_('Nombre'), max_length=256)
    sign = models.CharField(_('Signo'), max_length=5)

    class Meta:
        verbose_name = "Moneda"
        verbose_name_plural = "Monedas"

    def __str__(self):
        return self.name

    def __unicode__(self):
        return u'%s' % (self.name)


class Wallet(models.Model):
    currency = models.ForeignKey(Currency, verbose_name=_('Moneda'), related_name='wallets')
    user = models.ForeignKey(User, verbose_name=_('Propietario'), related_name='wallets')
    balance = models.FloatField(_('Balance'), default=1000)

    class Meta:
        verbose_name = "Billetera"
        verbose_name_plural = "Billeteras"

    def __str__(self):
        return self.user.username + ': ' + self.currency.symbol + ' ' + str(self.balance)

    def __unicode__(self):
        return u'%s%s%s%s%s' % (self.user.username, ': ', self.currency.symbol, ' ', self.balance)

    def add(self, amount):
        self.balance += amount
        return self.save()

    def remove(self, amount):
        self.balance -= amount
        return self.save()


class Transaction(models.Model):
    amount = models.FloatField(_('Monto'))
    date_time = models.DateTimeField(_('Fecha y Hora'), auto_now_add=True)
    origin = models.ForeignKey(Wallet, verbose_name=_('Billetera de origen'), related_name='transactions_made')
    destination = models.ForeignKey(Wallet, verbose_name=_('Billetera destino'), related_name='transactions_obtained')

    class Meta:
        verbose_name = "Transacción"
        verbose_name_plural = "Transacciones"
        ordering = ('date_time',)

    def __str__(self):
        users = 'From: ' + self.origin.user.username + ' To: ' + self.destination.user.username
        return users + ' Amount: ' + self.amount + ' ' + str(self.date_time)

    def __unicode__(self):
        users = 'From: ' + self.origin.user.username + ' To: ' + self.destination.user.username
        return u'%s%s%s%s%s' % (users, ' Amount: ', self.amount, ' ', str(self.date_time))

    def make_transaction(self, *args, **kwargs):
        same_currency = self.origin.currency == self.destination.currency
        enough_money = self.origin.balance >= self.amount

        if same_currency:
            if enough_money:
                if self.amount >= 0:
                    self.origin.remove(self.amount)
                    self.destination.sum(self.amount)
                    return super(Transaction, self).save(*args, **kwargs)
                else:
                    return {'error': 'Amount must be positive'}
            else:
                return {'error': 'Origin wallet must have enought money'}
        else:
            return {'error': 'Wallets must have the same currency'}
