import { Injectable } from '@angular/core';
import { Agenda } from './agenda';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private agendaUrl = 'http://localhost:8000/agendas/';
  constructor(private http: HttpClient) { }

  getAgendas(medicoId): Observable<Agenda[]>{
    return this.http.get<Agenda[]>(this.agendaUrl, {
      headers: new HttpHeaders({
        'Authorization': `Token ${this.getUserAuthenticationToken()}`
      }),
      params: {
        medico: medicoId
      }
    })
    .pipe(
      catchError(this.handleError<Agenda[]>('getAgendas', []))
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
