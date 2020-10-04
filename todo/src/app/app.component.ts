import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo';

  constructor(public afAuth: AngularFireAuth) {}
  
  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        
      } else {
        
      }
    });
}

}
