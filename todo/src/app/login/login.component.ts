import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../auth/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  // loginForm = new FormGroup({
  //   email: new FormControl(''),
  //   password : new FormControl('')
  // });

   loginForm : FormGroup;
   submitted : false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get currentLoginForm() 
  {
     return this.loginForm.controls; 
  }


  onLogin(){
   
    const {email, password} = this.loginForm.value;
    this.authService.login(email, password);
    
  }

}
