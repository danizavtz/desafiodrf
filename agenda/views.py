from agenda.models import Consulta, Agenda
from rest_framework import viewsets
from agenda.serializers import ConsultaSerializer, AgendaSerializer

class AgendaViewSet(viewsets.ModelViewSet):
    serializer_class = AgendaSerializer
    def get_queryset(self):
        queryset = Consulta.objects.all()
        medico = self.request.query_params.get('medico', None)
        if medico is not None:
            queryset = queryset.filter(medico=medico)
        
        especialidade = self.request.query_params.get('especialidade', None)
        if especialidade is not None:
            queryset = queryset.filter(especialidade=especialidade)
        
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
