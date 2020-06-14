import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Medico } from './medico';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private medicoUrl = 'http://localhost:8000/medicos/';
  constructor(
    private http: HttpClient
  ) { }

  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.medicoUrl, {
      headers: new HttpHeaders({
        'Authorization': `Token ${this.getUserAuthenticationToken()}`
      })
    })
      .pipe(
        catchError(this.handleError<Medico[]>('getMedicos', []))
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
