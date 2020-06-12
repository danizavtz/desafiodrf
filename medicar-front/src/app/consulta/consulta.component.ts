import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  dadosConsulta = new FormGroup({
    especialidade: new FormControl(''),
    medico: new FormControl(''),
    data: new FormControl(''),
    hora: new FormControl('')
  })
  especialidades = []
  medicos = []
  datas = []
  horas = []
  constructor(private router:  Router) { }

  ngOnInit(): void {
  }
  cancelarAcao(){
    this.router.navigate(['/lista'])
  }
  confirmarAcao(){
    console.log(this.dadosConsulta.value)
  }
  
  getEspecialidades() {
    return []
  }

  getMedicos() {
    return []
  }

  getDatas(){
    return []
  }

  getHoras(){
    return []
  }

}
