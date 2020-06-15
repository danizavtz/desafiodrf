import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  dadosAcesso: FormGroup;
  
  constructor(
    private router: Router,
    private loginservice: AuthenticationService
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
    const val = this.dadosAcesso.value;
    if (val.login && val.senha) {
      this.loginservice.login(val.login, val.senha)
        .subscribe(() => {
          this.router.navigateByUrl('lista')
        })
    }
  }

  actionCriarConta() {
    this.router.navigate(['/cadastro'])
  }

}
