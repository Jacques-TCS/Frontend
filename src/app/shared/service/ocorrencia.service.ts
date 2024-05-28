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

  constructor(private httpClient: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('id_token'),
    }),
  };

  atualizar(ocorrencia: Ocorrencia): Observable<Ocorrencia> {
    return this.httpClient.put<Ocorrencia>(
      this.API,
      ocorrencia,
      this.httpOptions
    );
  }

  consultarPorId(id: number): Observable<Ocorrencia> {
    return this.httpClient.get<Ocorrencia>(
      this.API + '/' + id,
      this.httpOptions
    );
  }

  listarTodos(): Observable<Array<Ocorrencia>> {
    return this.httpClient.get<Array<Ocorrencia>>(
      this.API + '/todos',
      this.httpOptions
    );
  }

  listarComSeletor(seletor: OcorrenciaSeletor) {
    return this.httpClient.post<Array<Ocorrencia>>(
      this.API + '/filtro',
      seletor,
      this.httpOptions
    );
  }
}
