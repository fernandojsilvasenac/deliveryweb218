import { FirebasePath } from './../../core/shared/firebase-path';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  criarConta(usuario: any) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha)
        .then((userCredential: firebase.auth.UserCredential) => {
          userCredential.user.updateProfile({ displayName: usuario.nome, photoURL: '' });
          userCredential.user.sendEmailVerification();
          this.logout();
          resolve();
        })
        .catch((error: any) => {
          reject(this.handlerError(error));
        });
    });
  }

  login(email: string, senha: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, senha)
        .then((userCredential: firebase.auth.UserCredential) => {
          if (userCredential.user.emailVerified) {
            resolve();
          } else {
            this.logout();
            reject('Seu e-mail ainda não foi verificado. Por favor verifique seu e-mail.')
          }
        })
        .catch((error: any) => {
          reject(this.handlerError(error));
        });
    });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  enviarEmailResetarSenha(email: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.sendPasswordResetEmail(email)
        .then(() => {
          resolve();
        })
        .catch((error: any) => {
          reject(this.handlerError(error));
        });
    });
  }

  handlerError(error: any) {
    let mensagem = '';
    if (error.code == 'auth/email-already-in-use') {
      mensagem = 'O e-mail informado já está sendo usado.';
    } else if (error.code == 'auth/invalid-email') {
      mensagem = 'O e-mail informado é inválido.';
    } else if (error.code == 'auth/operation-not-allowed') {
      mensagem = 'A autenticação por email e senha não está habilitada';
    } else if (error.code == 'auth/weak-password') {
      mensagem = 'A senha utilizada é muito fraca. Por favor escolha outra senha.';
    } else if (error.code == 'auth/user-disabled') {
      mensagem = 'O usuário está desabilitado, por favor contact o administrador.';
    } else if (error.code == 'auth/user-not-found' || error.code == 'auth/wrong-password') {
      mensagem = 'O usuario/senha inválido(s)';
    }

    return mensagem;
  }

  getDadosUsuario() {
    const path = `${FirebasePath.USUARIOS}${this.afAuth.auth.currentUser.uid}`
    return this.db.object(path).snapshotChanges().pipe(
      map(change => {
        return ({ key: change.key, nome: this.afAuth.auth.currentUser.displayName, ...change.payload.val() });
      })
    );
  }

  updateProfile(values: any) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.currentUser.updateProfile({ displayName: values.nome, photoURL: this.afAuth.auth.currentUser.photoURL });

      const path = `${FirebasePath.USUARIOS}${this.afAuth.auth.currentUser.uid}`
      this.db.object(path).update({ telefone: values.telefone, cpf: values.cpf })
        .then(() => resolve())
        .catch(() => reject());
    });
  }

  uploadImg(file: File) {
    return new Promise((resolve) => {
      const path = `${FirebasePath.USUARIOS}${this.afAuth.auth.currentUser.uid}`;
      const filePath = `${FirebasePath.USUARIOS}${this.afAuth.auth.currentUser.uid}/${file.name}`;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe((url => {
            this.db.object(path).update({ img: url, filePath: filePath });
            this.afAuth.auth.currentUser.updateProfile({ displayName: this.afAuth.auth.currentUser.displayName, photoURL: url });
            resolve();
          }));
        })
      ).subscribe();
    })
  }

  removeImg(filePath: string) {
    const path = `${FirebasePath.USUARIOS}${this.afAuth.auth.currentUser.uid}`;
    const ref = this.storage.ref(filePath);
    ref.delete();
    this.db.object(path).update({ img: '', filePath: '' });
    this.afAuth.auth.currentUser.updateProfile({ displayName: this.afAuth.auth.currentUser.displayName, photoURL: null });
  }
}
