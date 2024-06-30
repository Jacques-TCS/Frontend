import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  private cancelPendingRequests$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('login') && !req.url.includes('recuperar-senha') && !req.url.includes('api.qrserver')) {

      const authToken = localStorage.getItem('id_token');
      const authReq = req.clone({ setHeaders: { 'Authorization': 'Bearer ' + authToken } });

      return next.handle(authReq).pipe(
        takeUntil(this.cancelPendingRequests$),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.cancelPendingRequests$.next();
            this.authService.logout();
            this.router.navigate(['/login']);
            Swal.fire({
              title: 'Sessão expirada!',
              text: 'Acesse novamente o sistema.',
              icon: 'error',
              confirmButtonColor: '#3085d6',
            });
          }
          console.log(error.headers);

          return throwError(() => new Error('Requisição inválida.'));
        })
      );
    }
    return next.handle(req).pipe(
      takeUntil(this.cancelPendingRequests$)
    );
  }
}
