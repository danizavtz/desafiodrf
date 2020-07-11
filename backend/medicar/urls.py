from django.urls import include, path
from django.contrib import admin

admin.site.site_header = 'Medicar'
admin.site.index_title = 'Medicar'
admin.site.site_title = 'Medicar'

urlpatterns = [
    path('', include('agenda.urls')),
    path('', include('medico.urls')),
    path('', include('usuarios.urls')),
    path('admin/', admin.site.urls),
]