from django.db import models
from django.contrib.auth.models import User
from medico.models import Medico

class Agenda(models.Model):
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE, blank=False)
    dia = models.DateField(blank=False, null=False)
    horario = models.ForeignKey('Consulta', null=True, blank=True, on_delete=models.CASCADE, related_name='ahorario')
    class Meta:
        ordering = ['dia']
        unique_together = ['id','dia']

class Consulta(models.Model):
    agenda = models.ForeignKey(Agenda, on_delete=models.CASCADE)
    horario =  models.TimeField()
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    data_agendamento = models.DateTimeField(auto_now_add=True)