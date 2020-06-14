from agenda.models import Consulta, Agenda, HorarioAgendamento
from rest_framework import viewsets
from agenda.serializers import ConsultaSerializer, AgendaSerializer, HorarioAgendamentoSerializer

class AgendaViewSet(viewsets.ModelViewSet):
    serializer_class = AgendaSerializer
    def get_queryset(self):
        queryset = Agenda.objects.all()
        medico = self.request.query_params.get('medico', None)
        if medico is not None:
            queryset = queryset.filter(medico=medico)
        
        datai = self.request.query_params.get('data_inicio',None)
        if datai is not None:
            queryset = queryset.filter(dia__gte=datai)
        
        dataf = self.request.query_params.get('data_final', None)
        if dataf is not None:
            queryset = queryset.filter(dia__lte=dataf)
        return queryset

class ConsultaViewSet(viewsets.ModelViewSet):
    serializer_class = ConsultaSerializer
    queryset = Consulta.objects.all()

class HorarioViewSet(viewsets.ModelViewSet):
    serializer_class = HorarioAgendamentoSerializer

    def get_queryset(self):
        queryset = HorarioAgendamento.objects.all()
        agenda = self.request.query_params.get('agenda', None)
        if agenda is not None:
            queryset = queryset.filter(agenda=agenda)
        return queryset