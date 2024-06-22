import { HttpClient } from '@angular/common/http';
import { Ocorrencia } from '../model/ocorrencia';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OcorrenciaSeletor } from '../model/seletor/ocorrencia.seletor';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly API = 'http://144.22.190.101:8080/api/categoria-de-ocorrencia';

  constructor(private httpClient: HttpClient) {}

  consultarPorId(id: number): Observable<Categoria> {
    return this.httpClient.get<Categoria>(this.API + '/' + id);
  }

  listarTodos(): Observable<Array<Categoria>> {
    return this.httpClient.get<Array<Categoria>>(this.API + '/todos');
  }
}
