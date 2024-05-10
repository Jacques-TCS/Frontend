import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
providedIn: 'root',
})
export class RequestInterceptor implements HttpInterceptor {

	constructor(
		private router: Router
	) {}
	
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
		if(!req.url.includes('login')){
			var authToken = localStorage.getItem('id_token')
		
			const authReq = req.clone({ setHeaders: { 'Authorization': 'Bearer ' + authToken } });
		
			return next.handle(authReq).pipe(
				catchError((error, caught) => {
					if(error.status == 403){
						this.router.navigate(['/login'])
					}
					return caught
				})
			);
		}
		return next.handle(req)
	}
}
