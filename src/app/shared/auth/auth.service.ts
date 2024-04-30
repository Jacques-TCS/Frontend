import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API = 'http://localhost:8080/api/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.API}/login`, { email, password })
      .pipe(
        tap((res: { token: string; }) => this.setSession(res.token)),
        shareReplay()
      );
  }

  private setSession(token: string) {
    localStorage.setItem('id_token', token);
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  public isLoggedIn() {
    return localStorage.getItem('id_token') !== null;
  }
}
