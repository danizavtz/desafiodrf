import { Injectable } from '@angular/core';
import { Consulta } from './consulta';
// import { CONSULTAS } from './mock-consultas';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private consultaUsuarioUrl = 'http://localhost:8000/consultas/'
  
  constructor(private http: HttpClient,
              private tokenHeaders: HttpHeaders) {
              this.tokenHeaders = new HttpHeaders({
                'Authorization': `Token ${this.getUserAuthenticationToken()}`
              })
  }

  getConsultas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.consultaUsuarioUrl, {
      headers: this.tokenHeaders
    })
      .pipe(
        catchError(this.handleError<Consulta[]>('getConsultas', []))
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
