import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ambiente } from '../model/ambiente';
import { AmbienteSeletor } from '../model/seletor/ambiente.seletor';

@Injectable({
  providedIn: 'root',
})
export class AmbienteService {
  private readonly API = 'http://localhost:8080/api/atividade';

  constructor(private httpClient: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('id_token'),
    }),
  };

  inserir(ambiente: Ambiente): Observable<Ambiente> {
    return this.httpClient.post<Ambiente>(this.API, ambiente, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('id_token'),
      }),
      //TODO responseType: 'text',
    });
  }

  atualizar(ambiente: Ambiente): Observable<Ambiente> {
    return this.httpClient.put<Ambiente>(this.API, ambiente, this.httpOptions);
  }

  consultarPorId(id: number): Observable<Ambiente> {
    return this.httpClient.get<Ambiente>(this.API + '/' + id, this.httpOptions);
  }

  listarTodos(): Observable<Array<Ambiente>> {
    return this.httpClient.get<Array<Ambiente>>(
      this.API + '/todos',
      this.httpOptions
    );
  }

  listarComSeletor(seletor: AmbienteSeletor) {
    return this.httpClient.post<Array<Ambiente>>(
      this.API + '/filtro',
      seletor,
      this.httpOptions
    );
  }
}
