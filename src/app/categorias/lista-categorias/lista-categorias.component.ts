import { CategoriasService } from './../shared/categorias.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit {
categorias: Observable<any[]>;

  constructor(private categoriasService: CategoriasService) { }

  ngOnInit() {
    this.categorias = this.categoriasService.getAll();
  }


}
