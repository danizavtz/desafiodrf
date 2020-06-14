import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Especialidade } from '../especialidade';
import { Medico } from '../medico';
import { Agenda } from '../agenda';
import { Horario} from '../horario';
import { EspecialidadesService } from '../especialidades.service';
import { MedicoService } from '../medico.service';
import { AgendaService} from '../agenda.service';
import { HorarioService } from '../horario.service';

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
    private router:  Router,
    private especialidadeService: EspecialidadesService,
    private medicoService: MedicoService,
    private agendaService: AgendaService,
    private horarioService: HorarioService) {
      this.dadosConsulta = new FormGroup({
        especialidade: new FormControl(''),
        medico: new FormControl(''),
        data: new FormControl(''),
        hora: new FormControl('')
      })
     }

  ngOnInit(): void {
    this.getEspecialidades();
    this.getMedicos();
    this.getAgendas();
    this.getHorario();
  }
  cancelarAcao(){
    this.router.navigate(['/lista'])
  }
  confirmarAcao(){
    console.log(this.dadosConsulta.value)
  }
  
  getEspecialidades() : void {
    this.especialidadeService.getEspecialidades()
      .subscribe(especialidades => this.especialidades = especialidades);
  }

  getMedicos(): void {
    this.medicoService.getMedicos()
      .subscribe(medicos => this.medicos = medicos);
  }

  getAgendas(): void {
    this.agendaService.getAgendas()
      .subscribe(agendas => this.agendas = agendas);
  }

  getHorario(): void {
    this.horarioService.getHorarios()
      .subscribe(horarios => this.horarios = horarios);
  }

}
