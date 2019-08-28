import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../shared/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder, private usuarioService: UsuarioService,
    private router: Router, private toast: ToastrService) { }

  ngOnInit() {
    this.criarFormulario();
  }

  get email() { return this.formLogin.get('email'); }
  get senha() { return this.formLogin.get('senha'); }

  criarFormulario() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.formLogin.valid) {
      this.usuarioService.login(this.formLogin.value.email, this.formLogin.value.senha)
        .then(() => {
          this.router.navigate(['/dashboard']);
        })
        .catch((mensagem: string) => {
          this.toast.error(mensagem);
        });
    }
  }
}
