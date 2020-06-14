from django.contrib import admin
from .models import Agenda, Consulta

class AgendaAdmin(admin.ModelAdmin):
    list_display = ('medico','dia','horario')
class ConsultaAdmin(admin.ModelAdmin):
    list_display = ('horario',)
admin.site.register(Agenda, AgendaAdmin)
admin.site.register(Consulta, ConsultaAdmin)