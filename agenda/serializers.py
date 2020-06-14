from agenda.models import Consulta, Agenda, HorarioAgendamento
from rest_framework import serializers
from medico.serializers import MedicoSerializer

class HorarioAgendamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorarioAgendamento
        fields = ['id', 'horario',]

class HorarioAgendamentoSimplificadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorarioAgendamento
        fields = ['horario',]

class AgendaSerializer(serializers.ModelSerializer):
    medico = MedicoSerializer()
    horario = HorarioAgendamentoSimplificadoSerializer(read_only=True, many=True)
    class Meta:
        model = Agenda
        fields = ['id', 'medico',  'dia', 'horario']

class ConsultaSerializer(serializers.ModelSerializer):
    horario = HorarioAgendamentoSerializer()
    class Meta:
        model = Consulta
        fields = ['id', 'horario', 'data_agendamento']