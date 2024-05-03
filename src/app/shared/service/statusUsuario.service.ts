import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusUsuario } from './../model/status-usuario';

@Injectable({
  providedIn: 'root',
})
export class StatusUsuarioService {
  private readonly API = 'http://localhost:8080/api/status-usuario';

  constructor(
    private httpClient: HttpClient
  ) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('id_token') })
  };

  pesquisarPorId(id: number): Observable<StatusUsuario> {
    return this.httpClient.get<StatusUsuario>(this.API + '/' + id);
  }

  listarTodos(): Observable<Array<StatusUsuario>> {
    return this.httpClient.get<Array<StatusUsuario>>(this.API + '/todos', this.httpOptions);
  }
}
