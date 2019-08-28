import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../shared/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent implements OnInit {
  formEsqueciSenha: FormGroup;

  constructor(
    private formBuilder: FormBuilder, private usuarioService: UsuarioService,
    private toast: ToastrService) { }

  ngOnInit() {
    this.criarFormulario();
  }

  get email() { return this.formEsqueciSenha.get('email'); }

  criarFormulario() {
    this.formEsqueciSenha = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.formEsqueciSenha.valid) {
      this.usuarioService.enviarEmailResetarSenha(this.formEsqueciSenha.value.email)
        .then(() => {
          this.toast.success('E-mail enviado com sucesso');
        })
        .catch((mensagem: string) => {
          this.toast.error(mensagem);
        });
    }
  }
}
