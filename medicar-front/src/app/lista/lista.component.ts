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
  constructor(
    private router: Router,
    private consultaService: ConsultaService,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getConsultas();
  }

  getConsultas(): void {
    this.consultaService.getConsultas()
      .subscribe(consultas => this.lista = consultas);
  }

  novaConsultaAction(): void {
    this.router.navigate(['/consulta'])
  }

  desmarcarAction(idConsulta): void {
    if (confirm('Tem certeza que deseja desmarcar a consulta?')) {
      this.consultaService.desmarcarConsulta(idConsulta)
        .subscribe(() => {
          this.getConsultas();
        })
    }
  }

  deslogar() {
    this.authService.logout();
    this.router.navigateByUrl('/')
  }

}
