import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ambiente } from '../model/ambiente';
import { AmbienteSeletor } from '../model/seletor/ambiente.seletor';

@Injectable({
  providedIn: 'root',
})
export class AmbienteService {
  private readonly API = 'http://144.22.190.101:8080/api/ambiente';

  constructor(private httpClient: HttpClient) {}

  inserir(ambiente: Ambiente): Observable<Ambiente> {
    return this.httpClient.post<Ambiente>(this.API, ambiente);
  }

  atualizar(ambiente: Ambiente): Observable<Ambiente> {
    return this.httpClient.put<Ambiente>(this.API, ambiente);
  }

  consultarPorId(id: number): Observable<Ambiente> {
    return this.httpClient.get<Ambiente>(this.API + '/' + id);
  }

  listarTodos(): Observable<Array<Ambiente>> {
    return this.httpClient.get<Array<Ambiente>>(this.API + '/todos');
  }

  listarComSeletor(seletor: AmbienteSeletor) {
    return this.httpClient.post<Array<Ambiente>>(this.API + '/filtro', seletor);
  }

  contarTotalRegistros(seletor: AmbienteSeletor): Observable<number> {
    return this.httpClient.post<number>(this.API + '/contar', seletor);
  }

  contarPaginas(seletor: AmbienteSeletor): Observable<number> {
    return this.httpClient.post<number>(this.API + '/total-paginas', seletor);
  }
}
