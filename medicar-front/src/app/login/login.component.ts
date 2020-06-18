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
  tipoInputPassword: string;
  valorCheckBoxLembrarSenha: boolean;

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
    this.tipoInputPassword = 'password';
    this.verificarOpcaoLembrarSenha();
  }

  verificarOpcaoLembrarSenha() {
    const currentOption = localStorage.getItem('lembrarsenha')
    if (currentOption === null) {
      localStorage.setItem('lembrarsenha', 'false')
      this.valorCheckBoxLembrarSenha = false
    } else {
      let opt = JSON.parse(currentOption)
      if (opt === true) {
        this.colocarValoresCredenciaisForm();
      }
      this.valorCheckBoxLembrarSenha = opt

    }
  }
  gravarCredenciaisAcesso() {
    localStorage.setItem('login', this.dadosAcesso.value.login);
    localStorage.setItem('senha', btoa(this.dadosAcesso.value.senha));
  }

  colocarValoresCredenciaisForm() {
    try {
      const savedLogin = localStorage.getItem('login');
      const savedPassword = localStorage.getItem('senha');
      const decodedPwd = savedPassword ? atob(savedPassword) : '';
      this.dadosAcesso.get('login').setValue(savedLogin ? savedLogin : '');
      this.dadosAcesso.get('senha').setValue(decodedPwd);
    } catch (e) {
      console.error('houve um erro ao utilizar credenciais salvas. Detalhe: ' + e)
    }
  }

  actionLogin() {
    const val = this.dadosAcesso.value;
    if (val.login && val.senha) {
      this.loginservice.login(val.login, val.senha)
        .subscribe(() => {
          if (this.valorCheckBoxLembrarSenha) {
            this.gravarCredenciaisAcesso()
          }
          this.router.navigateByUrl('lista')
        })
    }
  }

  actionCriarConta() {
    this.router.navigateByUrl('cadastro')
  }

  actionMostrarSenha() {
    this.tipoInputPassword = this.tipoInputPassword === 'password' ? 'text' : 'password'
  }

  setarStatusLembrarSenha() {
    this.valorCheckBoxLembrarSenha = !this.valorCheckBoxLembrarSenha;
    if (this.valorCheckBoxLembrarSenha === true) {
      localStorage.setItem('lembrarsenha', 'true')
    } else {
      localStorage.setItem('lembrarsenha', 'false')
    }
  }

}
