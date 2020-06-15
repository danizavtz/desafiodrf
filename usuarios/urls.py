from django.urls import include, path
from rest_framework import routers
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken import views as tokenview
from .views import CreateUserView, UserViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path(r'', include(router.urls)),
    path('cadastro/', csrf_exempt(CreateUserView.as_view())),
    path('login/', tokenview.obtain_auth_token, name='api-tokn-auth'),
]