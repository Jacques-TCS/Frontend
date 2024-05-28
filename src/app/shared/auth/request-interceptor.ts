import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
providedIn: 'root',
})
export class RequestInterceptor implements HttpInterceptor {

	constructor(
		private router: Router,
    private authService: AuthService
	) {}
	
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
		if(!req.url.includes('login') && !req.url.includes('recuperar-senha')){
			var authToken = localStorage.getItem('id_token')
		
			const authReq = req.clone({ setHeaders: { 'Authorization': 'Bearer ' + authToken } });
		
			return next.handle(authReq).pipe(
				catchError((error: HttpErrorResponse) => {
					if(error.status == 403){
						this.authService.logout();
						this.router.navigate(['/login']);
					}
					return throwError(() => new Error('Requisição inválida.'));
				})
			);
		}
		return next.handle(req)
	}
}
