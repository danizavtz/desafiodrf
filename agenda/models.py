from django.db import models
from django.contrib.auth.models import User
from medico.models import Medico

class Consulta(models.Model):
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE, blank=False)
    dia = models.DateField(blank=False, null=False)
    horario =  models.TimeField()
    data_agendamento = models.DateTimeField(auto_now_add=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ['dia', 'horario']
        unique_together = ['id','dia']