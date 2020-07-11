import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Especialidade } from './especialidade';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {
  private especialidadeUrl = 'http://localhost:8000/especialidades/';
  constructor(
    private http: HttpClient) { }

    getEspecialidades() : Observable<Especialidade[]> {
      return this.http.get<Especialidade[]>(this.especialidadeUrl, {
        headers: new HttpHeaders({
          'Authorization': `Token ${this.getUserAuthenticationToken()}`
        })
      })
        .pipe(
          catchError(this.handleError<Especialidade[]>('getEspecialidades', []))
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
