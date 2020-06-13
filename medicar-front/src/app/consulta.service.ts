import { Injectable } from '@angular/core';
import { Consulta } from './consulta';
import { CONSULTAS } from './mock-consultas';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor() { 

  }

  getConsultas(): Observable<Consulta[]>{
    return of(CONSULTAS)
  }
}
