from agenda.models import Consulta, Agenda
from rest_framework import serializers
from medico.serializers import MedicoSerializer

class AgendaSerializer(serializers.ModelSerializer):
    medico = MedicoSerializer()
    class Meta:
        model = Agenda
        fields = ['id', 'dia', 'medico', 'horario']

class ConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consulta
        fields = ['id', 'agenda', 'horario', 'data_agendamento']