import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('authjwt');
        if (token) {
            var header = "Bearer " + token;
            var reqWithAuth = req.clone({ headers: req.headers.set("Authorization", header) });
            return next.handle(reqWithAuth);
          }
      
        return next.handle(req);
    }
}