import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { appUser } from './models/appUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo';
  appUser: appUser = new appUser();
  $authSubscription: Subscription;
  isLogged =  false;
  
  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService, ) {
    this.$authSubscription = this.authService.user$.subscribe((u) => {
      this.appUser = u;
    });
  }

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log(user);
        this.isLogged = true;
        this.router.navigate(['/list']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  onLogout() {
    this.authService
      .logout()
      .then((success) => {
        this.isLogged = false;
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        console.log('Error:', err.message);
      });
  }
}
