import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API = 'http://localhost:8080/api/usuario/login';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.API, {username: username, password: password}, this.httpOptions)
      .pipe(
        tap((response) => {
          this.setSession(response.token, response.nome, response.username, response.perfil)
        })
      );
  }

  private setSession(token: string, usuario: string, username: string, perfil: string) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('nome', usuario);
    localStorage.setItem('username', username);
    localStorage.setItem('perfil', perfil);
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('nome');
    localStorage.removeItem('username');
    localStorage.removeItem('perfil');
  }

  public isLoggedIn() {
    return localStorage.getItem('id_token') !== null;
  }
}
