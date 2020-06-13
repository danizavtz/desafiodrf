from django.contrib import admin

from .models import Especialidade

class EspecialidadeAdmin(admin.ModelAdmin):
    list_display = ('nome',)

admin.site.register(Especialidade, EspecialidadeAdmin)