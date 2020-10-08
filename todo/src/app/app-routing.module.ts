import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { AddEditTaskComponent } from './task/addedit-task.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard] },
  { path: 'list', component: ListComponent, canActivate: [AuthGuardGuard] },
  { path: 'task/:category', component: TaskComponent, canActivate: [AuthGuardGuard] },
  { path: 'task/bylist/:idlist', component: TaskComponent, canActivate: [AuthGuardGuard] },
  { path: 'task/add', component: AddEditTaskComponent, canActivate: [AuthGuardGuard] },
  { path: 'task/edit/:id', component: AddEditTaskComponent, canActivate: [AuthGuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
