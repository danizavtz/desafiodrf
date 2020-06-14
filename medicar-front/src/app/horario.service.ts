import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Horario } from './horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private horarioUrl = 'http://localhost:8000/horarios/'
  constructor(
    private http: HttpClient
  ) { }

  getHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.horarioUrl, {
    headers: new HttpHeaders({
      'Authorization': `Token ${this.getUserAuthenticationToken()}`
    })
  })
    .pipe(
      catchError(this.handleError<Horario[]>('getHorarios', []))
    )
  }

  private getUserAuthenticationToken() {
    const tkn = JSON.parse(localStorage.getItem('currentUser'))
    return tkn.token;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T)
    };
  }
}
