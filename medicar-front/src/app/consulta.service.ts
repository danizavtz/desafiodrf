import { Injectable } from '@angular/core';
import { Consulta } from './consulta';
import { Usuario } from './usuario';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private consultaUsuarioUrl = 'http://localhost:8000/consultas/';
  private currentUserUrl = 'http://localhost:8000/users/';

  constructor(private http: HttpClient) { }

  getConsultas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.consultaUsuarioUrl, {
      headers: new HttpHeaders({
        'Authorization': `Token ${this.getUserAuthenticationToken()}`
      })
    })
      .pipe(map(data => {
        return data;
      }),
        catchError(this.handleError<Consulta[]>('getConsultas', []))
      )
  }

  getCurrentUserData(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.currentUserUrl, {
      headers: new HttpHeaders({
        'Authorization': `Token ${this.getUserAuthenticationToken()}`
      })
    })
    .pipe(map(data => {
      return data;
    }),
      catchError(this.handleError<Usuario[]>('marcarConsulta'))
    )
  }

  marcarConsulta(agenda, horario): Observable<Consulta> {
    return this.http.post<Consulta>(this.consultaUsuarioUrl, { 'agenda_id': agenda, 'horario': horario }, {
      headers: new HttpHeaders({
        'Authorization': `Token ${this.getUserAuthenticationToken()}`
      })
    })
      .pipe(map(data => data),
        catchError((err) => throwError(err))
      )
  }

  desmarcarConsulta(consultaId): any {
    return this.http.delete<any>(`${this.consultaUsuarioUrl}${consultaId}/`, {
      headers: new HttpHeaders({
        'Authorization': `Token ${this.getUserAuthenticationToken()}`
      })
    })
      .pipe(
        catchError(this.handleError<any>('desmarcarConsulta'))
      )
  }

  private getUserAuthenticationToken() {
    const tkn = JSON.parse(localStorage.getItem('currentUser'))
    return tkn.token;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T)
    };
  }
}
