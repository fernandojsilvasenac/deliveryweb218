import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { FormCategoriasComponent } from './categorias/form-categorias/form-categorias.component';
import { ListaCategoriasComponent } from './categorias/lista-categorias/lista-categorias.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    FormCategoriasComponent,
    ListaCategoriasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
