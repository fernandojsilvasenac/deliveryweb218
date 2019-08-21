import { CategoriasService } from './../shared/categorias.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit {
categorias: Observable<any[]>;

  constructor(private categoriasService: CategoriasService,
              private toastr: ToastrService
              ) { }

  ngOnInit() {
    this.categorias = this.categoriasService.getAll();
  }

  remover(key: string) {
    this.categoriasService.remove(key)
      .then( (mensagem) => {
        this.toastr.success('Categoria excluida com sucesso!');
      })
      .catch((mensagem: string) => {
        this.toastr.error(mensagem);
      });
  }

}
