from django.contrib import admin

from .models import Especialidade, Medico

class EspecialidadeAdmin(admin.ModelAdmin):
    list_display = ('nome',)

class MedicoAdmin(admin.ModelAdmin):
    list_display = ('nome','crm','email','telefone','especialidade')

admin.site.register(Medico, MedicoAdmin)
admin.site.register(Especialidade, EspecialidadeAdmin)