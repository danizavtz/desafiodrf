from medico.models import Medico, Especialidade
from rest_framework import viewsets
from medico.serializers import MedicoSerializer, EspecialidadeSerializer

class MedicoViewSet(viewsets.ModelViewSet):
    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer

class EspecialidadeViewSet(viewsets.ModelViewSet):
    queryset = Especialidade.objects.all()
    serializer_class = EspecialidadeSerializer

