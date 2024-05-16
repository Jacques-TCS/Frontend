import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from '../model/servico';
import { ServicoSeletor } from '../model/seletor/servico.seletor';

@Injectable({
  providedIn: 'root',
})
export class ServicoService {
  private readonly API = 'http://localhost:8080/api/servicoPrestado';

  constructor(private httpClient: HttpClient) {}

  inserir(servico: Servico): Observable<Servico> {
    return this.httpClient.post<Servico>(this.API, servico);
  }

  consultarPorId(id: number): Observable<Servico> {
    return this.httpClient.get<Servico>(this.API + '/' + id);
  }

  listarTodos(): Observable<Array<Servico>> {
    return this.httpClient.get<Array<Servico>>(this.API + '/todos');
  }

  listarComSeletor(seletor: ServicoSeletor) {
    return this.httpClient.post<Array<Servico>>(this.API + '/filtro', seletor);
  }

  excluir(id: number): Observable<Servico> {
    return this.httpClient.delete<Servico>(this.API + '/' + id);
  }
}
