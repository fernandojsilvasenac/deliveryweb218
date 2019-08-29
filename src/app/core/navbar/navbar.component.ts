import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UsuarioService } from './../../usuarios/shared/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private afAuth: AngularFireAuth
              ) { }

  ngOnInit() {
  }

  sair() {
    this.usuarioService.logout()
      .then( () => {
        this.router.navigate(['/login']);
      });

  }
}
