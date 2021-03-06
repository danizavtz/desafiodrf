from agenda.models import Consulta, Agenda, HorarioAgendamento
from rest_framework import serializers
from medico.serializers import MedicoSerializer
import datetime
# from rest_framework.validators import 

class HorarioAgendamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorarioAgendamento
        fields = ['horario',]

class AgendaSerializer(serializers.ModelSerializer):
    medico = MedicoSerializer()
    horarios = HorarioAgendamentoSerializer(read_only=True, many=True)
    class Meta:
        model = Agenda
        fields = ['id', 'medico',  'dia', 'horarios']

class ConsultaSerializer(serializers.ModelSerializer):
    horario = HorarioAgendamentoSerializer()
    agenda = AgendaSerializer()
    class Meta:
        model = Consulta
        fields = ['id', 'horario', 'data_agendamento', 'agenda',]

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        agenda_representation = representation.pop('agenda')
        agenda_representation.pop('horarios')
        agenda_representation.pop('id')
        for key in agenda_representation:
            representation[key] = agenda_representation[key]

        horario_representation = representation.pop('horario')
        for key in horario_representation:
            representation[key] = horario_representation[key]

        return representation


class NovaConsultaSerializer(serializers.Serializer):
    agenda_id = serializers.IntegerField()
    horario = serializers.TimeField()

    def validate(self, data):
        agendaidentifier = data['agenda_id']
        try:
            a = Agenda.objects.get(pk=agendaidentifier)
            if a.dia < datetime.date.today():
                raise serializers.ValidationError("Data deve ser maior ou igual ao dia de hoje")
        except Agenda.DoesNotExist:
            raise serializers.ValidationError("Agenda não encontrada")
        return data