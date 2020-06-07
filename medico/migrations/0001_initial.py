# Generated by Django 3.0.7 on 2020-06-06 00:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Medico',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('crm', models.CharField(max_length=10)),
                ('email', models.EmailField(max_length=100)),
                ('telefone', models.CharField(max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='Especialidade',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=50)),
                ('medico', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='medico.Medico')),
            ],
        ),
    ]
