import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../shared/produtos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {
  produtos: Observable<any[]>;

  constructor(private produtoService: ProdutosService) { }

  ngOnInit() {
    this.produtos = this.produtoService.getAll();
  }

  remover(key: string, filePath: string) {
    this.produtoService.remove(key, filePath);
  }

}
