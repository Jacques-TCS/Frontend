import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Usuario } from '../model/usuario';
import { UsuarioSeletor } from '../model/seletor/usuario.seletor';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly API = 'http://localhost:8080/api/usuario';

  constructor(
    private httpClient: HttpClient
  ) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('id_token') })
  };

  inserir(usuario: Usuario): Observable<string> {
    return this.httpClient.post(this.API, usuario, {headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('id_token') }), responseType: 'text'});
  }

  atualizar(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(this.API, usuario, this.httpOptions);
  }

  redefinirSenha(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.API, usuario.password);
  }

  recuperarSenha(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.API, usuario.email);
  }

  // login(username: string, password: string): Observable<Usuario> {
  //   return this.httpClient.post<Usuario>(this.API + '/login', {username, password});
  // }

  pesquisarPorId(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.API + '/' + id, this.httpOptions);
  }

  listarTodos(): Observable<Array<Usuario>> {
    return this.httpClient.get<Array<Usuario>>(this.API + '/todos', this.httpOptions);
  }

  listarComSeletor(seletor: UsuarioSeletor) {
    return this.httpClient.post<Array<Usuario>>(this.API + '/filtro', seletor, this.httpOptions);
  }

  contarPaginas(seletor: UsuarioSeletor): Observable<number> {
    return this.httpClient.post<number>(this.API + '/total-paginas', seletor, this.httpOptions);
  }
}
