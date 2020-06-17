from django.db import models
from django.contrib.auth.models import User
from medico.models import Medico
from django.core.exceptions import ValidationError
import datetime

def validate_dia_greater_than_date(value):
    if value < datetime.date.today():
        raise ValidationError("Data deve ser maior ou igual ao dia de hoje")
    return value

class HorarioAgendamento(models.Model):
    horario =  models.TimeField()
    class Meta:
        verbose_name = "Horário agendamento"
        verbose_name_plural = "Horários agendamento"
    def __str__(self):
        return self.horario.strftime("%H:%M")

class Agenda(models.Model):
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE, blank=False)
    dia = models.DateField(blank=False, null=False, validators=[validate_dia_greater_than_date])
    horarios = models.ManyToManyField(HorarioAgendamento, blank=False, related_name='horarios')
    class Meta:
        ordering = ['dia']
        unique_together = ['medico','dia']

class Consulta(models.Model):
    horario = models.ForeignKey(HorarioAgendamento,on_delete=models.CASCADE, blank=False)
    agenda = models.ForeignKey(Agenda, on_delete=models.CASCADE, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    data_agendamento = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['agenda__dia','-horario']
        unique_together = ['horario', 'agenda']