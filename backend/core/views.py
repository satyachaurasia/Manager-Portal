from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, generics
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .serializers import ManagerSerializer, EmployeeSerializer
from .models import User
from rest_framework.pagination import PageNumberPagination


class EmployeeUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
	# Employee update delete and get operation api, need to pass id in url
	# METHOD get, delete, patch, put
	serializer_class = EmployeeSerializer
	permission_classes = (IsAuthenticated,)
	lookup_field = 'id'

	def get_object(self):
		return get_object_or_404(User, id=self.kwargs['id'], manager = self.request.user)



class EmployeeListCreate(generics.ListCreateAPIView):
	#Employee Create and List API
	# Method POST, GET
	serializer_class = EmployeeSerializer
	permission_classes = (IsAuthenticated,)
	pagination_class = PageNumberPagination
	def get_queryset(self):
		return get_user_model().objects.filter(manager = self.request.user)

	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data, context ={'request':request})
		serializer.is_valid(raise_exception=True)
		self.perform_create(serializer)
		headers = self.get_success_headers(serializer.data)
		return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ManagerRegisteration(generics.CreateAPIView):
	# Manager Signup page
	# Method POST
	serializer_class = ManagerSerializer
	queryset = get_user_model().objects.all()




