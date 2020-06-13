import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultaService } from '../consulta.service';
import { Consulta } from '../consulta';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  lista: Consulta[];
  constructor(
    private router: Router,
    private consultaService: ConsultaService) { }

  ngOnInit(): void {
    this.getConsultas();
  }

  getConsultas() : void {
    this.consultaService.getConsultas()
      .subscribe(consultas => this.lista = consultas);
  }

  novaConsultaAction() {
    this.router.navigate(['/consulta'])
  }

  desmarcarAction() {
    console.log('Desmarcar')
  }

}
