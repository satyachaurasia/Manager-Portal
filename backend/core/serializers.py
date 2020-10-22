from rest_framework import serializers
from django.contrib.auth import get_user_model


class EmployeeSerializer(serializers.ModelSerializer):
	class Meta:
		model = get_user_model()
		fields = ('first_name', 'last_name', 'mobile', 'email', \
				 'address', 'dob', 'company', 'employee_id', 'mobile', 'city', 'id')
	def create(self, validated_data):
		user = self.context['request'].user
		employee = get_user_model().objects.create_user(**validated_data)
		employee.manager = user
		employee.save()
		return employee




class ManagerSerializer(serializers.ModelSerializer):
	class Meta:
		model = get_user_model()
		fields = ('first_name', 'last_name', 'mobile', 'email', \
				 'password', 'address', 'dob', 'company')
		write_only_fields = ('password',)

	def create(self, validated_data):
		user = get_user_model().objects.create_manager(**validated_data)
		return user