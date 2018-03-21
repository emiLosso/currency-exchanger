from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from exchanger_app import views


router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'wallets', views.WalletViewSet)
router.register(r'transactions', views.TransactionViewSet)
router.register(r'currencies', views.CurrencyViewSet, base_name="currencies")


# urlpatterns = [
#     url(r'^api/', include(router.urls)),
# ]


urlpatterns = [
    url(r'^api/', include(router.urls,
                          namespace='api'), ),
]
