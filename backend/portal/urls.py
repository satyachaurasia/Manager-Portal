from django.urls import path

from rest_framework_jwt.views import obtain_jwt_token
from core.views import ManagerRegisteration, EmployeeListCreate,EmployeeUpdateDelete


urlpatterns = [
    path('token/', obtain_jwt_token),
	path('manager-register/', ManagerRegisteration.as_view(), name='manager_register'),
	path('employee/', EmployeeListCreate.as_view(), name='employee'),
	path('employee/<int:id>/',EmployeeUpdateDelete.as_view(), name='employee_update_delete'),
]
