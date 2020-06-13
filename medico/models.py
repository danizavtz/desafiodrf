from django.db import models
class Especialidade(models.Model):
    nome = models.CharField(max_length=50)

class Medico(models.Model):
    nome = models.CharField(max_length=100, blank=False, null=False)
    crm = models.CharField(max_length=10, blank=False, null=False)
    email = models.EmailField(max_length=100)
    telefone = models.CharField(max_length=15)
    especialidade = models.ForeignKey(Especialidade, on_delete=models.CASCADE)

    def __unicode__(self):
        return self.nome