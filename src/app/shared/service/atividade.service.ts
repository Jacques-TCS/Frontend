import { Atividade } from './../model/atividade';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AtividadeService {
  private readonly API = 'http://localhost:8080/api/usuarios';

  constructor(private httpClient: HttpClient) {}

  inserir(atividade: Atividade): Observable<Atividade> {
    return this.httpClient.post<Atividade>(this.API, atividade);
  }

  atualizar(atividade: Atividade): Observable<Atividade> {
    return this.httpClient.put<Atividade>(this.API, atividade);
  }

  pesquisarPorId(id: number): Observable<Atividade> {
    return this.httpClient.get<Atividade>(this.API + '/' + id);
  }

  listarTodos(): Observable<Array<Atividade>> {
    return this.httpClient.get<Array<Atividade>>(this.API + '/todos');
  }

  excluir(id: number): Observable<Atividade> {
    return this.httpClient.delete<Atividade>(this.API + '/' + id);
  }
}
