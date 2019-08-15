import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { ListaCategoriasComponent } from './categorias/lista-categorias/lista-categorias.component';
import { FormCategoriasComponent } from './categorias/form-categorias/form-categorias.component';
import { ListaProdutosComponent } from './produtos/lista-produtos/lista-produtos.component';
import { FormProdutosComponent } from './produtos/form-produtos/form-produtos.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'categorias', component: ListaCategoriasComponent },
      { path: 'categorias/nova', component: FormCategoriasComponent },
      { path: 'categorias/editar/:key', component: FormCategoriasComponent },
      { path: 'produtos', component: ListaProdutosComponent },
      { path: 'produtos/nova', component:  FormProdutosComponent},
      { path: 'produtos/editar/:key', component:  FormProdutosComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
