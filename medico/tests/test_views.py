import json
from django.test import TestCase
from rest_framework.test import RequestsClient
from medico.models import Especialidade
from medico.models import Medico

class EspecialidadeTest(TestCase):

    def criar_especialidade(self, nome='especialidade'):
        return Especialidade.objects.create(nome=nome)

    def test_listview(self):
        client = RequestsClient()
        resp = client.get('http://localhost:8080/especialidades/')
        self.assertEqual(resp.status_code, 200)
    
    def test_listviewDoesNotExist(self):
        client = RequestsClient()
        resp = client.get('http://localhost:8080/especialidade/')
        self.assertEqual(resp.status_code, 404)
    
    def test_getEspecialidadeById(self):
        client = RequestsClient()
        resp = client.get('http://localhost:8080/especialidades/0')
        self.assertEqual(resp.status_code, 404)

    def test_getEspecialidadeByidOk(self):
        client = RequestsClient()
        m = self.criar_especialidade()
        resp = client.get('http://localhost:8080/especialidades/{}'.format(m.id))
        self.assertEqual(resp.status_code, 200)

    def test_postEspecialidade(self):
        client = RequestsClient()
        e = {}
        e['nome'] = 'meunome'
        resp = client.post('http://localhost:8080/especialidades/', e)
        self.assertEqual(resp.status_code, 201)

    def test_updateEspecialidade(self):
        client = RequestsClient()
        especialidade = self.criar_especialidade()
        e = {}
        e['nome'] = 'nome'
        resp = client.put('http://localhost:8080/especialidades/{}/'.format(especialidade.id), e)
        self.assertEqual(resp.status_code, 200)
    
    def test_updateEspecialidade404(self):
        client = RequestsClient()
        especialidade = self.criar_especialidade()
        e = {}
        e['nome'] = 'nome'
        resp = client.put('http://localhost:8080/especialidades/0/', e)
        self.assertEqual(resp.status_code, 404)

    def test_deleteEspecialidade(self):
         client = RequestsClient()
         especialidade = self.criar_especialidade()
         resp = client.delete('http://localhost:8080/especialidades/{}/'.format(especialidade.id))
         self.assertEqual(resp.status_code, 204)

    def test_deleteEspecialidade404(self):
         client = RequestsClient()
         especialidade = self.criar_especialidade()
         resp = client.delete('http://localhost:8080/especialidades/0/')
         self.assertEqual(resp.status_code, 404)

class MedicoTest(TestCase):
    def criar_especialidade(self, nome='especialidade'):
        return Especialidade.objects.create(nome=nome)

    def criar_medico(self, nome='meunome', crm='1234',email='a@a.com',telefone='123456'):
        e = self.criar_especialidade()
        return Medico.objects.create(nome=nome,crm=crm,email=email,telefone=telefone, especialidade = e)
    
    def test_listview_medico(self):
        client = RequestsClient()
        resp = client.get('http://localhost:8080/medicos/')
        self.assertEqual(resp.status_code, 200)

    def test_listview_medico404(self):
        client = RequestsClient()
        resp = client.get('http://localhost:8080/medico/')
        self.assertEqual(resp.status_code, 404)

    def test_listview_medico_id404(self):
        client = RequestsClient()
        resp = client.get('http://localhost:8080/medicos/0/')
        self.assertEqual(resp.status_code, 404)
    
    def test_listview_medico_id(self):
        med = self.criar_medico()
        client = RequestsClient()
        resp = client.get('http://localhost:8080/medicos/{}/'.format(med.id))
        self.assertEqual(resp.status_code, 200)

    # def test_post_medico(self):
    #     # espe = self.criar_especialidade()
    #     # med = self.criar_medico()
    #     client = RequestsClient()
    #     m = {}
    #     m['nome'] = 'meunome'
    #     m['crm'] = '1234' 
    #     m['email'] = 'a@a.com'
    #     m['telefone'] = '123456'
    #     espe = {'nome': 'nome'}
    #     m['especialidade'] = espe
    #     resp = client.post('http://localhost:8080/medicos/',m)
    #     print(resp.content)
    #     self.assertEqual(resp.status_code, 201)

    # def test_update_medico_nome(self):
    #     med = self.criar_medico()
    #     client = RequestsClient()
    #     m = {}
    #     m['nome'] = 'meunome'
    #     m['crm'] = '1234' 
    #     m['email'] = 'a@a.com'
    #     m['telefone'] = '123456'
    #     espe = {'nome': 'nome'}
    #     m['especialidade'] = espe
    #     resp = client.put('http://localhost:8080/medicos/{}/'.format(med.id), m)
    #     self.assertEqual(resp.status_code, 200)

    def test_delete_medico(self):
        m = self.criar_medico()
        client = RequestsClient()
        resp = client.delete('http://localhost:8080/medicos/{}/'.format(m.id))
        self.assertEqual(resp.status_code, 204)