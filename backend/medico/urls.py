from django.urls import include, path
from rest_framework import routers
from .views import MedicoViewSet, EspecialidadeViewSet

router = routers.DefaultRouter()
router.register(r'medicos', MedicoViewSet, basename='medicos')
router.register(r'especialidades', EspecialidadeViewSet, basename='especialidades')

urlpatterns = [
    path(r'', include(router.urls)),
]