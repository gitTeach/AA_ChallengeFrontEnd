import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: User;

  constructor(public afAuth: AngularFireAuth) {}

  login2(email: string, password: string) {
    //const result = await this.afAuth.signInWithEmailAndPassword(email, password);
    const result = this.afAuth
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    return result;
  }

  async login(email: string, password: string){
   return await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Logged');
      })
      .catch(err => {
        console.log('Error:',err.message);
      });
  }

  async logout() {
    return await this.afAuth
      .signOut()
      .then(function () {
        console.log('User looged out');
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
