from django.contrib.auth.models import User
from django.db import IntegrityError
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from agenda.models import Consulta, Agenda, HorarioAgendamento
from rest_framework import viewsets
from agenda.serializers import ConsultaSerializer, AgendaSerializer, HorarioAgendamentoSerializer, NovaConsultaSerializer
import datetime

class AgendaViewSet(viewsets.ModelViewSet):
    serializer_class = AgendaSerializer
    def get_queryset(self):
        queryset = Agenda.objects.all()
        especialidade = self.request.query_params.get('especialidade', None)
        if especialidade is not None:
            queryset = queryset.filter(medico__especialidade=especialidade)

        medico = self.request.query_params.get('medico', None)
        if medico is not None:
            queryset = queryset.filter(medico=medico, dia__gte=datetime.date.today())
        
        datai = self.request.query_params.get('data_inicio',None)
        if datai is not None:
            queryset = queryset.filter(dia__gte=datai)
        
        dataf = self.request.query_params.get('data_final', None)
        if dataf is not None:
            queryset = queryset.filter(dia__lte=dataf)
        return queryset

class ConsultaViewSet(viewsets.ModelViewSet):
    serializer_class = ConsultaSerializer
    def get_queryset(self):
        currentUser = self.request.user
        queryset = Consulta.objects.filter(user=currentUser, agenda__dia__gte=datetime.date.today())
        return queryset

    def create(self, request):
        consulta_data = NovaConsultaSerializer(data=request.data)
        if consulta_data.is_valid():
            try:
                agendaobj = Agenda.objects.get(pk=consulta_data.validated_data['agenda_id'])
                horarioobj = HorarioAgendamento.objects.get(horario=consulta_data.validated_data['horario'])
                currentUser = User.objects.get(username=self.request.user)
                c = Consulta.objects.create(horario=horarioobj, agenda=agendaobj, user=currentUser)
                serialized_data = ConsultaSerializer(instance=c)
                return Response(serialized_data.data, status=status.HTTP_201_CREATED)
            except IntegrityError:
                content = {'consulta': 'Já existe uma consulta marcada neste dia e horário'}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(consulta_data._errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            currentUser = self.request.user
            c = Consulta.objects.get(pk=pk, user=currentUser, agenda__dia__gte=datetime.date.today())
            c.delete()
            return Response(None, status=status.HTTP_204_NO_CONTENT)
        except Consulta.DoesNotExist:
            raise Http404