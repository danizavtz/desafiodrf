import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  dadosAcesso: FormGroup;
  
  constructor(
    private router: Router,
    private loginservice: LoginService
      ) {
    this.dadosAcesso = new FormGroup({
    login: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
  });
  }

  get login() {
    return this.dadosAcesso.get('login');
  }

  get senha() {
    return this.dadosAcesso.get('senha');
  }
  
  ngOnInit(): void {
  }

  actionLogin() {
    console.log(this.dadosAcesso.value)
  }

  actionCriarConta() {
    this.router.navigate(['/cadastro'])
  }

}
