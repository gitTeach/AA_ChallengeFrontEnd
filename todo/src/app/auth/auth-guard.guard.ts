import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private authService : AuthService 
) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean>
    | Promise<boolean>
    | boolean {

    const currentUser = this.authService.getCurrentUser;
      if (currentUser.isSignedIn) {
          console.log('guard ->',currentUser);
          return true;
      }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
