from agenda.models import Agenda, Horario
from rest_framework import viewsets
from agenda.serializers import AgendaSerializer, HorarioSerializer

class AgendaViewSet(viewsets.ModelViewSet):
    queryset = Agenda.objects.all()
    serializer_class = AgendaSerializer

class HorarioViewSet(viewsets.ModelViewSet):
    queryset = Horario.objects.all()
    serializer_class = HorarioSerializer