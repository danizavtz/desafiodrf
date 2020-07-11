from medico.models import Medico, Especialidade
from rest_framework import serializers

class EspecialidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidade
        fields = ['id','nome']

class MedicoSerializer(serializers.ModelSerializer):
    especialidade = EspecialidadeSerializer(read_only=True)
    class Meta:
        model = Medico
        fields = ['id', 'crm', 'nome', 'especialidade']

