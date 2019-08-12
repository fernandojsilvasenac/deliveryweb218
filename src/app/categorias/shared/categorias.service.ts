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

  insert(){

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

  remove(){

  }


}
