import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultaService } from '../consulta.service';
import { Consulta } from '../consulta';
import { Usuario } from '../usuario';
import { AuthenticationService } from '../authentication.service'

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  lista: Consulta[];
  usuario: Usuario;
  constructor(
    private router: Router,
    private consultaService: ConsultaService,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getConsultas();
    this.getCurrentLoggedUser();
  }

  getConsultas(): void {
    this.consultaService.getConsultas()
      .subscribe(consultas => this.lista = consultas);
  }

  getCurrentLoggedUser(): void {
    this.consultaService.getCurrentUserData()
      .subscribe(usuarios => this.usuario = usuarios.shift())
  }

  novaConsultaAction(): void {
    this.router.navigateByUrl('consulta')
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
