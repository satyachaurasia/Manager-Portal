from django.db import models

# Create your models here.

from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import (
	BaseUserManager, AbstractBaseUser
	)

class MyUserBaseManager(BaseUserManager):
	def create_manager(self, email, password, **extra_fields):
		if not email:
			raise ValueError('Users must have an email_id')

		email = self.normalize_email(email)
		user = self.model(email=email, **extra_fields)
		user.set_password(password)
		user.is_manager = True
		user.save(using=self._db)

		return user

	def create_user(self, email, password=None, **extra_fields):
		if not email:
			raise ValueError('Users must have an email_id')

		email = self.normalize_email(email)
		user = self.model(email=email, **extra_fields)
		user.set_unusable_password()
		user.save()
		return user 




class User(AbstractBaseUser, PermissionsMixin):
	employee_id = models.CharField(max_length=50, blank=True)
	email = models.EmailField(max_length=255,unique=True)
	first_name = models.CharField(max_length=50)
	last_name = models.CharField(max_length=50)
	address = models.TextField()
	dob = models.DateField()
	company = models.CharField(max_length=50)
	mobile = models.CharField(max_length=15, blank=True)
	city = models.CharField(max_length=20, blank=True)
	manager = models.ForeignKey('self', on_delete = models.CASCADE, null=True, blank=True)

	is_manager = models.BooleanField(default=False)


	USERNAME_FIELD = 'email'

	REQUIRED_FIELDS = []

	objects = MyUserBaseManager()
