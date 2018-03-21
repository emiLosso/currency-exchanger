# # -*- coding: utf-8 -*-
# # from __future__ import unicode_literals
# from rest_framework.test import APITestCase
# from rest_framework import status

# from rest_framework.test import APIClient
# from django.core.urlresolvers import reverse




# class ApiTestCase(APITestCase):

#     def setUp(self):
#         activate('en')
#         self.client = APIClient()
#         User = get_user_model()
#         admin = User.objects.create_user(username="admin@prisma.com", password="admin")
#         Application = get_application_model()
#         self.application = Application(
#             name="Test Application",
#             redirect_uris="http://localhost",
#             user=admin,
#             client_type=Application.CLIENT_CONFIDENTIAL,
#             authorization_grant_type=Application.GRANT_PASSWORD,
#         )
#         self.application.save()


#    def test_currencies(self):
#        user, account = self.create_user()
#        address_str = 'testbitcoinaddress'
#        # build a fake bitcoin address just for test
#        address = BitcoinDepositAddress(
#            account=account,
#            address=address_str
#        )
#        address.save()

#        url = reverse('api:bitcoin-address')

#        # test invalid unauthorized api call
#        response = self.client.get(url, format='json')
#        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

#        # get a token
#        access_token = self.get_access_token(self.application, username="api@ripio.com",
#                                             password="ripio", scopes="read write")
#        auth_header = "Bearer {0}".format(access_token)

#        # test valid bitcoin address api call
#        response = self.client.get(url, format='json',
#                                   HTTP_AUTHORIZATION=auth_header)
#        bitcoin_address_res = json.loads(response.content)
#        self.assertEqual(bitcoin_address_res['address'], address_str)  



# class ApiTestCase(APITestCase):

#     # user = User.objects.get(username='lauren')
#     # client = APIClient()
#     # client.force_authenticate(user=user)

#     def setUp(self):
#         """Define the test client and other test variables."""
#         self.client = APIClient()
#         self.bucketlist_data = {'name': 'Go to Ibiza'}
#         self.response = self.client.post(
#             reverse('create'),
#             self.bucketlist_data,
#             format="json")

#     def test_api_can_create_a_currency(self):
#         """Test the api has currency creation capability."""
#         self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

#     def test_api_can_get_a_bucketlist(self):
#         """Test the api can get a given bucketlist."""
#         bucketlist = Bucketlist.objects.get()
#         response = self.client.get(
#             reverse('details',
#             kwargs={'pk': bucketlist.id}), format="json")

#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertContains(response, bucketlist)

#     def test_api_can_update_bucketlist(self):
#         """Test the api can update a given bucketlist."""
#         change_bucketlist = {'name': 'Something new'}
#         res = self.client.put(
#             reverse('details', kwargs={'pk': bucketlist.id}),
#             change_bucketlist, format='json'
#         )
#         self.assertEqual(res.status_code, status.HTTP_200_OK)

#     def test_api_can_delete_bucketlist(self):
#         """Test the api can delete a bucketlist."""
#         bucketlist = Bucketlist.objects.get()
#         response = self.client.delete(
#             reverse('details', kwargs={'pk': bucketlist.id}),
#             format='json',
#             follow=True)

#         self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)       