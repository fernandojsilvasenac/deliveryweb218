import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { FormCategoriasComponent } from './categorias/form-categorias/form-categorias.component';
import { ListaCategoriasComponent } from './categorias/lista-categorias/lista-categorias.component';
import { environment } from '../environments/environment';
import { FormProdutosComponent } from './produtos/form-produtos/form-produtos.component';
import { ListaProdutosComponent } from './produtos/lista-produtos/lista-produtos.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal/confirm-modal.component';
import { ConfirmTemplateDirective } from './confirm-modal/shared/confirm-template.directive';
import { CriarContaComponent } from './usuarios/criar-conta/criar-conta.component';
import { LoginComponent } from './usuarios/login/login.component';
import { EsqueciSenhaComponent } from './usuarios/esqueci-senha/esqueci-senha.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    FormCategoriasComponent,
    ListaCategoriasComponent,
    FormProdutosComponent,
    ListaProdutosComponent,
    ConfirmModalComponent,
    ConfirmTemplateDirective,
    CriarContaComponent,
    LoginComponent,
    EsqueciSenhaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
