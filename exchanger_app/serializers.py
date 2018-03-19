from rest_framework import serializers
from .models import Currency, Wallet, Transaction
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=100)
    id = serializers.IntegerField()

    class Meta:
        model = User
        fields = ('id', 'username')


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ('id', 'name', 'sign')


class WalletSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    currency = CurrencySerializer()
    user = UserSerializer(required=False)

    class Meta:
        model = Wallet
        fields = ('id', 'balance', 'currency', 'user')

    def create(self, validated_data):
        user = self.context['request'].user
        currency = Currency.objects.get(name=validated_data['currency']['name'])

        return Wallet.objects.create(currency=currency, user=user)


class TransactionSerializer(serializers.ModelSerializer):
    origin = WalletSerializer(many=False)
    destination = WalletSerializer(many=False)

    class Meta:
        model = Transaction
        fields = ('id', 'amount', 'date_time', 'origin', 'destination')

    def create(self, validated_data):
        origin = Wallet.objects.get(pk=validated_data['origin']['id'])
        destination = Wallet.objects.get(pk=validated_data['destination']['id'])
        amount = validated_data['amount']
        transac = Transaction(
            destination=destination,
            origin=origin,
            amount=amount
        )
        search_error = transac.save()
        try:
            search_error = search_error.get('error', None)
        except:
            return transac
        else:
            if search_error:
                raise serializers.ValidationError({'detail': search_error})
