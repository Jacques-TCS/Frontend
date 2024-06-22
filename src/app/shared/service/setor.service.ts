import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Setor } from '../model/setor';
import { SetorSeletor } from '../model/seletor/setor.seletor';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SetorService {
    private readonly API = 'http://144.22.190.101:8080/api/setor';

    constructor(private httpClient: HttpClient) { }

    inserir(setor: Setor): Observable<Setor> {
        return this.httpClient.post<Setor>(this.API, setor);
    }

    atualizar(setor: Setor): Observable<Setor> {
        return this.httpClient.put<Setor>(this.API, setor);
    }

    consultarPorId(id: number): Observable<Setor> {
        return this.httpClient.get<Setor>(this.API + '/' + id);
    }

    listarTodos(): Observable<Array<Setor>> {
        return this.httpClient.get<Array<Setor>>(this.API + '/todos');
    }

    listarComSeletor(seletor: SetorSeletor) {
        return this.httpClient.post<Array<Setor>>(this.API + '/filtro', seletor);
    }

    contarTotalRegistros(seletor: SetorSeletor): Observable<number> {
        return this.httpClient.post<number>(this.API + '/contar', seletor);
    }

    contarPaginas(seletor: SetorSeletor): Observable<number> {
        return this.httpClient.post<number>(this.API + '/total-paginas', seletor);
    }
}