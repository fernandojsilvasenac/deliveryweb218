import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
categoriasRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.categoriasRef = this.db.list('categorias/');
   }

  insert(categoria: any) {
    return this.categoriasRef.push(categoria);
  }

  update(){

  }

  getAll() {
    return this.categoriasRef.snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({key: m.payload.key, ...m.payload.val() }))
      })
    )
  }

  getByKey(){

  }

  remove(key: string){
    // return new Promise((resolve, reject) => {
    //       const subscribe = this.getProdutosByCategoria(key).subscribe((produtos: any) => {
    //         subscribe.unsubscribe();

    //         if (produtos.length == 0) {
              return this.categoriasRef.remove(key);
    //         } else {
    //           reject('Não é possível excluir a categoria pois ela tem produtos associados.')
    //         }
    //       });
    // });
  }


}
