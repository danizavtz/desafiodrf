import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultaService } from '../consulta.service';
import { Consulta } from '../consulta';
import { AuthenticationService } from '../authentication.service'

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  loading = false;
  lista: Consulta[];
  selectedConsulta: Consulta;
  constructor(
    private router: Router,
    private consultaService: ConsultaService,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getConsultas();
  }

  getConsultas() : void {
    this.consultaService.getConsultas()
      .subscribe(consultas => this.lista = consultas);
  }

  novaConsultaAction(): void {
    this.router.navigate(['/consulta'])
  }

  desmarcarAction() :void  {
    console.log(this.selectedConsulta);
    //this.consultaService.desmarcarConsulta(this.selectedConsulta.id);
    this.getConsultas();
  }

  onSelect(consulta: Consulta): void {
    this.selectedConsulta = consulta;
    console.log('up')
  }

  deslogar() {
    this.authService.logout();
    this.router.navigateByUrl('/')
  }

}
