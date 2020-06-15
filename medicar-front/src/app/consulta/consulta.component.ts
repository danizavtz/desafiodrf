import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Especialidade } from '../especialidade';
import { Medico } from '../medico';
import { Agenda } from '../agenda';
import { Horario } from '../horario';
import { EspecialidadesService } from '../especialidades.service';
import { MedicoService } from '../medico.service';
import { AgendaService } from '../agenda.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  dadosConsulta: FormGroup;
  especialidades: Especialidade[];
  medicos: Medico[];
  agendas: Agenda[];
  horarios: Horario[];
  constructor(
    private router: Router,
    private especialidadeService: EspecialidadesService,
    private medicoService: MedicoService,
    private agendaService: AgendaService) {
    this.dadosConsulta = new FormGroup({
      especialidade: new FormControl(''),
      medico: new FormControl(''),
      agenda: new FormControl(''),
      hora: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.getEspecialidades();
  }
  cancelarAcao() {
    this.router.navigate(['/lista'])
  }
  confirmarAcao() {
    console.log(this.dadosConsulta.value)
  }

  getEspecialidades(): void {
    this.especialidadeService.getEspecialidades()
      .subscribe(especialidades => this.especialidades = especialidades);
  }

  getMedicos(especialidade): void {
    this.medicoService.getMedicos(especialidade)
      .subscribe(medicos => this.medicos = medicos);
  }

  getAgendas(idMedico): void {
    this.agendaService.getAgendas(idMedico)
      .subscribe(agendas => this.agendas = agendas);
  }

  getHorariosAgenda(selecaoIdAgenda): Observable<Horario[]> {
    return of(this.agendas.find(item => {
      return item.id = selecaoIdAgenda
    }).horario);
  }

  onChangeEspecialidade(valor): void {
    this.getMedicos(valor)
  }
  onChangeMedico(selecaoIdMedico): void {
    this.getAgendas(selecaoIdMedico);
  }

  onChangeAgenda(selecaoIdAgenda): void {
    this.getHorariosAgenda(selecaoIdAgenda)
      .subscribe(horarios => this.horarios = horarios)
  }

}
