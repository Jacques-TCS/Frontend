import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargo } from '../model/cargo';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
  private readonly API = 'http://localhost:8080/api/cargo';

  constructor(
    private httpClient: HttpClient
  ) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('id_token') })
  };

  pesquisarPorId(id: number): Observable<Cargo> {
    return this.httpClient.get<Cargo>(this.API + '/' + id);
  }

  listarTodos(): Observable<Array<Cargo>> {
    return this.httpClient.get<Array<Cargo>>(this.API + '/todos', this.httpOptions);
  }
}
