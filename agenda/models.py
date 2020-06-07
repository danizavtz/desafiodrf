from django.db import models
from medico.models import Medico

class Agenda(models.Model):
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE, blank=False)
    dia = models.DateField(blank=False, null=False)

class Horario(models.Model):
    horario = models.ForeignKey(Agenda, on_delete=models.CASCADE)
    agendamento = models.DateField(blank=False, null=False)