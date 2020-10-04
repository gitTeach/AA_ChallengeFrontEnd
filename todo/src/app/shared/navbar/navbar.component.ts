import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isLogged = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 

  }

  ngOnInit(): void {
  }

  onLogout(){
    this.authService.logout();
  }

}
