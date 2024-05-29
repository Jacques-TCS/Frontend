import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ocorrencia } from './../model/ocorrencia';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OcorrenciaSeletor } from '../model/seletor/ocorrencia.seletor';

@Injectable({
  providedIn: 'root',
})
export class OcorrenciaService {
  private readonly API = 'http://localhost:8080/api/ocorrencia';

  constructor(private httpClient: HttpClient) { }

  atualizar(ocorrencia: Ocorrencia): Observable<Ocorrencia> {
    return this.httpClient.put<Ocorrencia>(this.API, ocorrencia);
  }

  consultarPorId(id: number): Observable<Ocorrencia> {
    return this.httpClient.get<Ocorrencia>(this.API + '/' + id);
  }

  listarTodos(): Observable<Array<Ocorrencia>> {
    return this.httpClient.get<Array<Ocorrencia>>(this.API + '/todos');
  }

  listarComSeletor(seletor: OcorrenciaSeletor) {
    return this.httpClient.post<Array<Ocorrencia>>(
      this.API + '/filtro',
      seletor
    );
  }

  contarTotalRegistros(seletor: OcorrenciaSeletor): Observable<number> {
    return this.httpClient.post<number>(this.API + '/contar', seletor);
  }

  contarPaginas(seletor: OcorrenciaSeletor): Observable<number> {
    return this.httpClient.post<number>(this.API + '/total-paginas', seletor);
  }
}
