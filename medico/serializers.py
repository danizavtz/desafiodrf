from medico.models import Medico, Especialidade
from rest_framework import serializers

class EspecialidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidade
        fields = ['id','nome']

class MedicoSerializer(serializers.ModelSerializer):
    especialidade = EspecialidadeSerializer()
    class Meta:
        model = Medico
        fields = ['id','nome', 'crm', 'email', 'telefone', 'especialidade']

    def create(self, validated_data):
        especialidades = validated_data.pop('especialidade')
        medico = Medico.objects.create(**validated_data)
        for e in especialidades:
            Especialidades.objects.create(medico=medico, **e)
        return medico

