from agenda.models import Consulta
from rest_framework import serializers
from medico.serializers import MedicoSerializer

class ConsultaSerializer(serializers.ModelSerializer):
    medico = MedicoSerializer()
    class Meta:
        model = Consulta
        fields = ['id', 'dia', 'horario', 'data_agendamento', 'medico']