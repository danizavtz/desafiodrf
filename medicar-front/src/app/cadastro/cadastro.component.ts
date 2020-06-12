import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  dadosCadastro: FormGroup;

  constructor(private router: Router) {
    this.dadosCadastro = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('')
  })
}

get name() {
  return this.dadosCadastro.get('name');
}

get email() {
  return this.dadosCadastro.get('email');
}

get password() {
  return this.dadosCadastro.get('password');
}

get confirmPassword() {
  return this.dadosCadastro.get('confirmPassword');
}

ngOnInit(): void {
}

actionConfirmar() {
  console.log(this.dadosCadastro.value)
  console.log('confirmar')
}

actionCancelar() {
  this.router.navigate(['/login'])
}

}
