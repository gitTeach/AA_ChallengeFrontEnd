import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User} from 'firebase';
import { first} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user:User;

  constructor(public afAuth: AngularFireAuth) { }

  async login(email: string, password:string){

      //const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      const result =  await this.afAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });  
      return result;    
  }

  async logout(){
    
      await this.afAuth.signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
        console.error(error);
      });

  }

  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }

}
