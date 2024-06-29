import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from '../model/servico';
import { ServicoSeletor } from '../model/seletor/servico.seletor';

@Injectable({
  providedIn: 'root',
})
export class ServicoService {
  private readonly API = 'http://144.22.190.101:8080/api/servico';

  constructor(private httpClient: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('id_token') })
  };

  consultarPorId(id: number): Observable<Servico> {
    return this.httpClient.get<Servico>(this.API + '/' + id);
  }

  listarTodos(): Observable<Array<Servico>> {
    return this.httpClient.get<Array<Servico>>(this.API + '/todos', this.httpOptions);
  }

  listarComSeletor(seletor: ServicoSeletor) {
    return this.httpClient.post<Array<Servico>>(this.API + '/filtro', seletor, this.httpOptions);
  }

  excluir(id: number): Observable<Servico> {
    return this.httpClient.delete<Servico>(this.API + '/' + id);
  }

  contarTotalRegistros(seletor: ServicoSeletor): Observable<number> {
    return this.httpClient.post<number>(this.API + '/contar', seletor, this.httpOptions);
  }

  contarPaginas(seletor: ServicoSeletor): Observable<number> {
    return this.httpClient.post<number>(this.API + '/total-paginas', seletor, this.httpOptions);
  }

  atribuirFuncionario(id: number, servicosSelecionados: Array<number>) {
    return this.httpClient.put(this.API + '/atualizar-em-massa?usuarioId=' + id, servicosSelecionados, this.httpOptions);
  }
}
