import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { promise } from 'protractor';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { appUser } from 'src/app/models/appUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public firebaseUser: User;
  user$: BehaviorSubject<appUser> = new BehaviorSubject<appUser>(new appUser());

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((firebaseUser) => {
      this.configureAuthState(firebaseUser);
    });
  }

  configureAuthState(firebaseUser: firebase.User): void {
    //   httpOptions = {
    //     headers: new HttpHeaders({
    //       // 'Content-Type': 'application/json',
    //       // 'withCredentials': 'false',
    //       // 'Access-Control-Allow-Origin': '*',
    //       'Content-Type': 'application/json'
    //     })
    // };

    if (firebaseUser) {
      firebaseUser.getIdToken().then((jwt) => {
        let User = new appUser();
        User.displayName = firebaseUser.displayName;
        User.email = firebaseUser.email;
        User.isSignedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(User));
        localStorage.setItem("authjwt", jwt);
        this.user$.next(User);
      });
    } else {
      this.clearUserData();
    }
  }

  private clearUserData() {
    let User = new appUser();
    User.displayName = null;
    User.email = null;
    User.isSignedIn = false;
    localStorage.removeItem("authjwt");
    localStorage.removeItem('currentUser');
    this.user$.next(User);
  }

  // login(email: string, password: string) {
  //   return this.afAuth
  //     .signInWithEmailAndPassword(email, password)
  //     .then((value) => {
  //       console.log(value);
  //       //localStorage.setItem('currentUser', JSON.stringify(user));
  //       console.log('Logged');
  //     })
  //     .catch((err) => {
  //       console.log('Error:', err.message);
  //     });
  // }

  login(email: string, password: string) : Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((auth) => {
      console.log(auth);
    });
  }

  async logout() {
    return await this.afAuth
      .signOut()
      .then(function () {
        console.log('User logged out');
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  getCurrentFirebaseUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }
  
  public get getCurrentUser(): appUser {
    return this.user$.value;
  }

  

}
