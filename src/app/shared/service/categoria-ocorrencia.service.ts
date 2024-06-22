import { HttpClient } from '@angular/common/http';
import { Ocorrencia } from '../model/ocorrencia';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OcorrenciaSeletor } from '../model/seletor/ocorrencia.seletor';
import { CategoriaDeOcorrencia } from '../model/categoriaDeOcorrencia';

@Injectable({
  providedIn: 'root',
})
export class CategoriaDeOcorrenciaService {
  private readonly API = 'http://144.22.190.101:8080/api/categoria-de-ocorrencia';

  constructor(private httpClient: HttpClient) {}

  consultarPorId(id: number): Observable<CategoriaDeOcorrencia> {
    return this.httpClient.get<CategoriaDeOcorrencia>(this.API + '/' + id);
  }

  listarTodos(): Observable<Array<CategoriaDeOcorrencia>> {
    return this.httpClient.get<Array<CategoriaDeOcorrencia>>(this.API + '/todos');
  }
}
