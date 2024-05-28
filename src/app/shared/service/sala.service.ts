import { Observable } from 'rxjs';
import { Sala } from '../model/ambiente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  private readonly API = 'http://localhost:8080/api/sala';

  constructor(private httpClient: HttpClient) {}
  inserir(sala: Sala): Observable<Sala> {
    return this.httpClient.post<Sala>(this.API, sala);
  }

  atualizar(sala: Sala): Observable<Sala> {
    return this.httpClient.put<Sala>(this.API, sala);
  }

  pesquisarPorId(id: number): Observable<Sala> {
    return this.httpClient.get<Sala>(this.API + '/' + id);
  }

  listarTodos(): Observable<Array<Sala>> {
    return this.httpClient.get<Array<Sala>>(this.API + '/todos');
  }
}
