import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
providedIn: 'root',
})
export class RequestInterceptor implements HttpInterceptor {

	constructor() {}
	
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		if(!req.url.includes('login')){
			// Get the auth token from the service.
			var authToken = localStorage.getItem('id_token')
		
			const authReq = req.clone({ setHeaders: { 'Authorization': 'Bearer ' + authToken } });
		
			// send cloned request with header to the next handler.
			return next.handle(authReq);
		}
		return next.handle(req)
	}
}
