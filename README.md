# Currency Exchanger

Project that shows the use of a currency and its operations developed with [Django](http://www.djangoproject.com/), [Django-rest-framework](http://www.django-rest-framework.org/) and [AngularJS](https://angular.io/).

### Installing

A step by step series of examples that tell you have to get a development env running

In the console run the following commands:

### Server
+ Activate a virtualenv: `source env/bin/activate`
+ In the project folder:
+ `pip install -r requirements.txt`
+ `cp currency_exchanger/settings/secrets_example.py currency_exchanger/settings/secrets.py`
+ `python manage.py makemigrations`
+ `python manage.py migrate`
+ `python manage.py loaddata static/fixtures/currencies.json`
+ Create some users with: `python manage.py createsuperuser`

### Client
+ `cd static/client/currency-exchanger`
+ `sudo npm install -g @angular/cli`
+ `npm install`
+ `ng build`
+ `cd ..` three times
+ `python manage.py runserver`
+ Go to [localhost](http://localhost:8000)

### Example
+ Login with a user created
+ Create a wallet for example of Peso Argentino curreny
+ Logout and login with other user created
+ Create a wallet of Peso Argentino too, because the sender and the receiver must have a wallet of same currency
+ Make a transaction of 100 Pesos to the previous user.
+ See the result of the operation and make other transactions and operations in the site.
