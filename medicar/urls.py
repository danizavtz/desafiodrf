# from django.contrib import admin
# from django.urls import path

# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]

from django.urls import include, path
from rest_framework import routers
from quickstart import views
from medico import views as mview
from agenda import views as aview

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'medicos', mview.MedicoViewSet)
router.register(r'especialidades', mview.EspecialidadeViewSet)
router.register(r'agendas', aview.AgendaViewSet)
router.register(r'horarios', aview.HorarioViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]