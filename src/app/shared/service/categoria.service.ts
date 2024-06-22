import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly API = 'http://144.22.190.101:8080/api/categoria-de-ocorrencia';

  constructor(private httpClient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('id_token'),
    }),
  };

  pesquisarPorId(id: number): Observable<Categoria> {
    return this.httpClient.get<Categoria>(this.API + '/' + id);
  }

  listarTodos(): Observable<Array<Categoria>> {
    return this.httpClient.get<Array<Categoria>>(
      this.API + '/todos',
      this.httpOptions
    );
  }
}
