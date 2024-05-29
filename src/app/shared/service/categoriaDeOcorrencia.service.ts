import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaDeOcorrencia } from '../model/categoriaDeOcorrencia';

@Injectable({
  providedIn: 'root',
})
export class CategoriaDeOcorrenciaService {
  private readonly API = 'http://localhost:8080/api/categoria-de-ocorrencia';

  constructor(private httpClient: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('id_token'),
    }),
  };

  pesquisarPorId(id: number): Observable<CategoriaDeOcorrencia> {
    return this.httpClient.get<CategoriaDeOcorrencia>(this.API + '/' + id);
  }

  listarTodos(): Observable<Array<CategoriaDeOcorrencia>> {
    return this.httpClient.get<Array<CategoriaDeOcorrencia>>(
      this.API + '/todos',
      this.httpOptions
    );
  }
}
