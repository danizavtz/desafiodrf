from django.db import models
from django.contrib.auth.models import User
from medico.models import Medico
from django.core.exceptions import ValidationError
import datetime

def validate_dia_greater_than_date(value):
    if value < datetime.date.today():
        raise ValidationError("Data deve ser maior ou igual ao dia de hoje")
    return value

class Agenda(models.Model):
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE, blank=False)
    dia = models.DateField(blank=False, null=False, validators=[validate_dia_greater_than_date])
    horario = models.ForeignKey('Consulta', blank=False, on_delete=models.CASCADE, related_name='ahorario')
    class Meta:
        ordering = ['dia']
        unique_together = ['medico','dia']

class Consulta(models.Model):
    agenda = models.ForeignKey(Agenda, on_delete=models.CASCADE)
    horario =  models.TimeField()
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    data_agendamento = models.DateTimeField(auto_now_add=True)