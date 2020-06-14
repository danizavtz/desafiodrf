from django.contrib import admin
from .models import Agenda, HorarioAgendamento

class AgendaAdmin(admin.ModelAdmin):
    list_display = ('medico','dia','horario')

class HorarioAgendamentoAdmin(admin.ModelAdmin):
    list_display = ('horario',)

admin.site.register(Agenda, AgendaAdmin)
admin.site.register(HorarioAgendamento, HorarioAgendamentoAdmin)