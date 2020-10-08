import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/services/auth.service';
import { TaskComponent } from './task/task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEditTaskComponent } from './task/addedit-task.component';
import {DpDatePickerModule} from 'ng2-date-picker';
import  {BsDatepickerModule} from 'ngx-bootstrap/datepicker'

@NgModule({
  declarations: [	
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ListComponent,
    LoginComponent,
    TaskComponent,
    AddEditTaskComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    DpDatePickerModule, 
    BsDatepickerModule.forRoot()
  ],
  providers: [AuthGuardGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
