from rest_framework import serializers
from medico.models import Medico
from medico.models import Especialidade
from medico.serializers import EspecialidadeSerializer
from medico.serializers import MedicoSerializer
from django.test import TestCase

class EspecialidadeTest(TestCase):

    def criar_especialidade(self, nome='especialidade'):
        return Especialidade.objects.create(nome=nome)

    def setUp(self):
        self.especialidade = self.criar_especialidade()
        self.serializer = EspecialidadeSerializer(instance=self.especialidade)
    
    def test_contains_expected_fields(self):
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set(['nome', 'id']))

class MedicoTest(TestCase):
    def criar_especialidade(self, nome='especialidade'):
        return Especialidade.objects.create(nome=nome)

    def criar_medico(self, nome='meunome', crm='1234',email='a@a.com',telefone='123456'):
        e = self.criar_especialidade()
        return Medico.objects.create(nome=nome,crm=crm,email=email,telefone=telefone, especialidade = Especialidade.objects.first())

    def setUp(self):
        self.medico = self.criar_medico()
        self.serializer = MedicoSerializer(instance=self.medico)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set(['nome', 'crm', 'email', 'telefone', 'especialidade', 'id']))
