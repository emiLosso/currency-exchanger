from django.conf.urls import url, include
from django.contrib import admin
from rest_framework_jwt.views import obtain_jwt_token
from exchanger_app import views

app_name = 'exchanger_app'

urlpatterns = [
    url(r'^', include('exchanger_app.urls')),
    url(r'^admin', admin.site.urls),
    url(r'^api/api-token-auth/', obtain_jwt_token),
    url(r'^', views.AppView.as_view()),
]
