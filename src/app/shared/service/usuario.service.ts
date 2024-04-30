import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { UsuarioSeletor } from '../model/seletor/usuario.seletor';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly API = 'http://localhost:8080/api/usuario';

  constructor(private httpClient: HttpClient) {}

  inserir(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.API, usuario);
  }

  atualizar(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(this.API, usuario);
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
    return this.httpClient.get<Usuario>(this.API + '/' + id);
  }

  listarTodos(): Observable<Array<Usuario>> {
    return this.httpClient.get<Array<Usuario>>(this.API + '/todos');
  }

  listarComSeletor(seletor: UsuarioSeletor) {
    return this.httpClient.post<Array<Usuario>>(this.API + '/filtro', seletor);
  }
}
