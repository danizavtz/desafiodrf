from medico.models import Medico, Especialidade
from rest_framework import viewsets
from medico.serializers import MedicoSerializer, EspecialidadeSerializer

class MedicoViewSet(viewsets.ModelViewSet):
    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer

class EspecialidadeViewSet(viewsets.ModelViewSet):
    serializer_class = EspecialidadeSerializer
    def get_queryset(self): 
        queryset = Especialidade.objects.all()
        search = self.request.query_params.get('search', None)
        if search is not None:
            queryset = queryset.filter(nome__istartswith=search)
        return queryset


