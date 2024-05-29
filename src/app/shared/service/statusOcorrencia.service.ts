import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusOcorrencia } from '../model/status-ocorrencia';

@Injectable({
  providedIn: 'root',
})
export class StatusOcorrenciaService {
  private readonly API = 'http://localhost:8080/api/status-usuario';

  constructor(private httpClient: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('id_token'),
    }),
  };

  pesquisarPorId(id: number): Observable<StatusOcorrencia> {
    return this.httpClient.get<StatusOcorrencia>(this.API + '/' + id);
  }

  listarTodos(): Observable<Array<StatusOcorrencia>> {
    return this.httpClient.get<Array<StatusOcorrencia>>(
      this.API + '/todos',
      this.httpOptions
    );
  }
}
