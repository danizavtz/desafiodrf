import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private heroesUrl = 'auth/login';  // URL to web api
  constructor(
    private http: HttpClient,

  ) { }
}
