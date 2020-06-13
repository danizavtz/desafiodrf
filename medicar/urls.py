from django.urls import include, path
from rest_framework import routers
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken import views as tokenview
from quickstart import views as rfviews
from medico import views as mview
from agenda import views as aview

router = routers.DefaultRouter()
router.register(r'users', rfviews.UserViewSet)
router.register(r'groups', rfviews.GroupViewSet)
router.register(r'medicos', mview.MedicoViewSet, basename='medicos')
router.register(r'especialidades', mview.EspecialidadeViewSet, basename='especialidades')
router.register(r'consultas', aview.ConsultaViewSet, basename='consultas')
router.register(r'agendas', aview.AgendaViewSet, basename='agendas')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('login/', tokenview.obtain_auth_token, name='api-tokn-auth')
]