import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,} from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { appUser } from '../models/appUser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  
  appUser: appUser = new appUser();
  public isLogged = false;
  $authSubscription: Subscription;

  loginForm: FormGroup;
  submitted = false;

  constructor( private authService: AuthService,private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) 
  {
    this.$authSubscription = this.authService.user$.subscribe((u) => {
      this.appUser = u;

      if (this.appUser.isSignedIn){
        this.router.navigate(['']);
      }

    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
    });
  }

  get currentLoginForm() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    
    this.authService.login(email, password).then((success) => {
      this.router.navigate(['/list']);
    }).catch((err) => {
      this.router.navigate(['/login']);
      console.log('Error Login:', err.message);
    });;
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }
}
