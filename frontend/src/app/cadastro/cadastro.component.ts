import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { CadastroService } from '../cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  dadosCadastro: FormGroup;
  tipoInputSenha: string;
  tipoInputConfirmarSenha: string;

  constructor(
    private router: Router,
    private cadastroService: CadastroService) {
    this.dadosCadastro = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
    this.dadosCadastro.setValidators(this.checkpasswordValidator());
  }

  private checkpasswordValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const control1 = group.controls['password'];
      const control2 = group.controls['confirmPassword'];
      if (control1.value !== control2.value) {
        control2.setErrors({ notEquivalent: true });
      } else {
        control2.setErrors(null);
      }
      return;
    }
  };

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
    this.tipoInputSenha = 'password';
    this.tipoInputConfirmarSenha = 'password';
  }

  actionConfirmar() {
    const val = this.dadosCadastro.value;
    if (val.name && val.email && val.password) {
      this.cadastroService.cadastrar(val.name, val.email, val.password, val.confirmPassword)
        .subscribe(() => {
          this.router.navigateByUrl('login')
        })
    }
  }

  actionCancelar() {
    this.router.navigateByUrl('login')
  }

  actionShowPassword() {
    this.tipoInputSenha = this.tipoInputSenha === 'password' ? 'text' : 'password';
  }

  actionShowConfirmPassword() {
    this.tipoInputConfirmarSenha = this.tipoInputConfirmarSenha === 'password' ? 'text' : 'password';
  }

}
