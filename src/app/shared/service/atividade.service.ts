import { Atividade } from './../model/atividade';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AtividadeSeletor } from '../model/seletor/atividade.seletor';

@Injectable({
  providedIn: 'root',
})
export class AtividadeService {
  private readonly API = 'http://localhost:8080/api/atividade';

  constructor(private httpClient: HttpClient) { }

  inserir(atividade: Atividade): Observable<Atividade> {
    return this.httpClient.post<Atividade>(this.API, atividade);
  }

  atualizar(atividade: Atividade): Observable<Atividade> {
    return this.httpClient.put<Atividade>(this.API, atividade);
  }

  consultarPorId(id: number): Observable<Atividade> {
    return this.httpClient.get<Atividade>(this.API + '/' + id);
  }

  listarTodos(): Observable<Array<Atividade>> {
    return this.httpClient.get<Array<Atividade>>(this.API + '/todos');
  }

  listarComSeletor(seletor: AtividadeSeletor) {
    return this.httpClient.post<Array<Atividade>>(this.API + '/filtro', seletor);
  }

  excluir(id: number): Observable<Atividade> {
    return this.httpClient.delete<Atividade>(this.API + '/' + id);
  }
}
