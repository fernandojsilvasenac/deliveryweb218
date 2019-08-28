import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../shared/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {
  formCriarConta: FormGroup;

  constructor(
    private formBuilder: FormBuilder, private usuarioService: UsuarioService,
    private router: Router, private toast: ToastrService) { }

  ngOnInit() {
    this.criarFormulario();
  }

  get nome() { return this.formCriarConta.get('nome'); }
  get email() { return this.formCriarConta.get('email'); }
  get senha() { return this.formCriarConta.get('senha'); }

  criarFormulario() {
    this.formCriarConta = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.formCriarConta.valid) {
      this.usuarioService.criarConta(this.formCriarConta.value)
        .then(() => {
          this.toast.success('Sua conta foi criada com sucesso.');
          this.router.navigate(['/login']);
        })
        .catch((mensagem: string) => {
          this.toast.error(mensagem);
        });
    }
  }
}
