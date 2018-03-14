from django.conf.urls import url, include
from django.contrib import admin
from rest_framework_jwt.views import obtain_jwt_token

app_name = 'exchanger_app'

urlpatterns = [
    url(r'^', include('exchanger_app.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^api/api-token-auth/', obtain_jwt_token),
]
