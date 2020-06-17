import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Especialidade } from '../especialidade';
import { Medico } from '../medico';
import { Agenda } from '../agenda';
import { Horario } from '../horario';
import { EspecialidadesService } from '../especialidades.service';
import { MedicoService } from '../medico.service';
import { AgendaService } from '../agenda.service';
import { ConsultaService } from '../consulta.service';

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
  errorMsg: string;
  constructor(
    private router: Router,
    private especialidadeService: EspecialidadesService,
    private medicoService: MedicoService,
    private agendaService: AgendaService,
    private consultaService: ConsultaService) {
    this.dadosConsulta = new FormGroup({
      especialidade: new FormControl('', Validators.required),
      medico: new FormControl({ value: '', disabled: true }, Validators.required),
      agenda: new FormControl({ value: '', disabled: true }, Validators.required),
      hora: new FormControl({ value: '', disabled: true }, Validators.required)
    })
  }
  get especialidade() {
    return this.dadosConsulta.get('especialidade');
  }
  get medico() {
    return this.dadosConsulta.get('medico');
  }
  get agenda() {
    return this.dadosConsulta.get('agenda');
  }
  get hora() {
    return this.dadosConsulta.get('hora');
  }
  ngOnInit(): void {
    this.getEspecialidades();
    this.errorMsg = "";
  }
  cancelarAcao() {
    this.router.navigateByUrl('lista')
  }
  marcarConsultaAcao() {
    const val = this.dadosConsulta.value
    if (val.agenda && val.hora) {
      this.consultaService.marcarConsulta(val.agenda, val.hora)
        .subscribe(
          () => {
            this.router.navigateByUrl('lista')
          },
          err => {
            try {
              if (err.status === 400 && err.error) {
                if (err.error.consulta) {
                  this.errorMsg = err.error.consulta;
                } else if (err.error.non_field_errors) {
                  this.errorMsg = err.error.non_field_errors.shift()
                }
              } else {
                this.errorMsg = 'Houve um erro ao tentar realizar marcação de consulta'
              }
            } catch (e) {
              this.errorMsg = "Houve um erro ao efetuar uma consulta"
            }
          })
    }
  }

  getEspecialidades(): void {
    this.especialidadeService.getEspecialidades()
      .subscribe(especialidades => this.especialidades = especialidades);
  }

  getMedicos(especialidade): void {
    this.medicoService.getMedicos(especialidade)
      .subscribe(medicos => {
        this.medicos = medicos;
        this.medicos.length > 0 ? this.dadosConsulta.get('medico').enable() : this.dadosConsulta.get('medico').disable();
      });
  }

  getAgendas(idMedico): void {
    this.agendaService.getAgendas(idMedico)
      .subscribe(agendas => {
        this.agendas = agendas;
        this.agendas.length > 0 ? this.dadosConsulta.get('agenda').enable() : this.dadosConsulta.get('agenda').disable();
      });
  }

  getHorariosAgenda(selecaoIdAgenda): Observable<Horario[]> {
    return of(this.agendas.find(item => {
      return item.id = selecaoIdAgenda
    }).horarios);
  }

  onChangeEspecialidade(valor): void {
    this.resetControllersState();
    this.getMedicos(valor)
  }
  onChangeMedico(selecaoIdMedico): void {
    this.getAgendas(selecaoIdMedico)
  }

  onChangeAgenda(selecaoIdAgenda): void {
    this.getHorariosAgenda(selecaoIdAgenda)
      .subscribe(horarios => {
        this.horarios = horarios;
        this.horarios.length > 0 ? this.dadosConsulta.get('hora').enable() : this.dadosConsulta.get('hora').disable();
      })
  }

  private resetControllersState(): void {
    this.medicos = [];
    this.agendas = [];
    this.horarios = [];
    this.dadosConsulta.get('medico').disable();
    this.dadosConsulta.get('agenda').disable();
    this.dadosConsulta.get('hora').disable();
  }

}
