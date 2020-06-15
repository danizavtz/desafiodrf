from django.urls import include, path
from rest_framework import routers
from .views import ConsultaViewSet, AgendaViewSet

router = routers.DefaultRouter()
router.register(r'consultas', ConsultaViewSet, basename='consultas')
router.register(r'agendas', AgendaViewSet, basename='agendas')

urlpatterns = [
    path(r'', include(router.urls)),
]