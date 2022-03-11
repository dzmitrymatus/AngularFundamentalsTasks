import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SessionStorageService } from '../services/session-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authHeader = "Authorization";

  constructor(private sessionStorageService: SessionStorageService,
    private router: Router,
    private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.sessionStorageService.getToken();
    if(token) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }

    return next.handle(request).pipe(
      tap({error: (error) => {
        if(error instanceof HttpErrorResponse && error.status === 401) {
          this.authService.logout();
          this.router.navigateByUrl("/login");
        }
      }})
      );
  }
}
