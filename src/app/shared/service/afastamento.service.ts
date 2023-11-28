import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Afastamento } from '../model/afastamento';
import { AfastamentoSeletor } from '../model/seletor/afastamento.seletor';
@Injectable({
  providedIn: 'root',
})
export class AfastamentoService {
  private readonly API = 'http://localhost:8080/api/usuarios';

  constructor(private httpClient: HttpClient) {}
  inserir(afastamento: Afastamento): Observable<Afastamento> {
    return this.httpClient.post<Afastamento>(this.API, afastamento);
  }

  atualizar(afastamento: Afastamento): Observable<Afastamento> {
    return this.httpClient.put<Afastamento>(this.API, afastamento);
  }

  pesquisarPorId(id: number): Observable<Afastamento> {
    return this.httpClient.get<Afastamento>(this.API + '/' + id);
  }

  listarTodos(): Observable<Array<Afastamento>> {
    return this.httpClient.get<Array<Afastamento>>(this.API + '/todos');
  }

  listarComSeletor(seletor: AfastamentoSeletor) {
    return this.httpClient.post<Array<Afastamento>>(
      this.API + '/filtro',
      seletor
    );
  }
}
