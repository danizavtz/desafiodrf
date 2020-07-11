from django.test import TestCase
from medico.models import Medico
from medico.models import Especialidade
from django.db.utils import IntegrityError

class EspecialidadeTest(TestCase):
    def criar_especialidade(self, nome='especialidade'):
        return Especialidade.objects.create(nome=nome)
    
    def test_especialidade_creation(self):
        e = self.criar_especialidade()
        self.assertTrue(isinstance(e, Especialidade))
        self.assertEqual(e.__unicode__(), e.nome)

    def test_especialidade_update_nome(self):
        e = self.criar_especialidade()
        self.assertTrue(e.nome, 'especialidade')
        self.assertTrue(e.id, 1)
        e1 = Especialidade.objects.first()
        e1.nome = 'espe'
        self.assertEqual(e1.nome, 'espe')
        self.assertTrue(e.id, 1)
    
    def test_especialidade_delete(self):
        e = self.criar_especialidade()
        e.delete()
        self.assertEqual(Especialidade.objects.count(), 0)

class MedicoTest(TestCase):

    def criar_especialidade(self, nome='especialidade'):
        return Especialidade.objects.create(nome=nome)

    def criar_medico(self, nome='meunome', crm='1234',email='a@a.com',telefone='123456'):
        e = self.criar_especialidade()
        return Medico.objects.create(nome=nome,crm=crm,email=email,telefone=telefone, especialidade = e)
    
    def test_medico_creation(self):
        m = self.criar_medico()
        self.assertTrue(isinstance(m, Medico))
        self.assertEqual(m.id, 1)
        self.assertEqual(m.__unicode__(), m.nome)
    
    def test_medico_validation_creation(self):
        with self.assertRaises(IntegrityError):
            m = Medico.objects.create(nome='meunome', crm='1234',email='a@a.com',telefone='123456')

    def teste_medico_update_nome(self):
        self.criar_medico()
        m = Medico.objects.first()
        self.assertEqual(m.nome, 'meunome')
        self.assertEqual(m.id, 1)
        m.nome = 'meunomemodificado'
        m.save()
        self.assertEqual(m.nome, 'meunomemodificado')
        self.assertEqual(m.id, 1)
    
    def test_medico_update_crm(self):
        self.criar_medico()
        m = Medico.objects.first()
        self.assertEqual(m.crm, '1234')
        self.assertEqual(m.id, 1)
        m.crm = '4321'
        m.save()
        self.assertEqual(m.crm, '4321')
        self.assertEqual(m.id, 1)

    def test_medico_update_email(self):
        self.criar_medico()
        m = Medico.objects.first()
        self.assertEqual(m.email, 'a@a.com')
        self.assertEqual(m.id, 1)
        m.email = 'b@b.com'
        m.save()
        self.assertEqual(m.email, 'b@b.com')
        self.assertEqual(m.id, 1)

    def test_medico_update_telefone(self):
        self.criar_medico()
        m = Medico.objects.first()
        self.assertEqual(m.telefone, '123456')
        self.assertEqual(m.id, 1)
        m.telefone = '12345'
        m.save()
        self.assertEqual(m.telefone, '12345')
        self.assertEqual(m.id, 1)

    def test_medico_update_especialidade(self):
        self.criar_medico()
        m = Medico.objects.first()
        self.assertEqual(m.especialidade, Especialidade.objects.first())
        self.assertEqual(m.id, 1)
        e1 = Especialidade.objects.create(nome='especialidade1')
        m.especialidade = e1
        m.save()
        self.assertEqual(m.especialidade, e1)
        self.assertEqual(m.id, 1)
    
    def test_medico_delete_medico(self):
        self.criar_medico()
        m = Medico.objects.first()
        m.delete()
        self.assertEqual(Medico.objects.count(), 0)

