import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cronograma } from '../model/cronograma';
import { CronogramaSeletor } from '../model/seletor/cronograma.seletor';

@Injectable({
    providedIn: 'root',
})
export class CronogramaService {
    private readonly API = 'http://144.22.190.101:8080/api/cronograma';

    constructor(private httpClient: HttpClient) { }

    inserir(cronograma: Cronograma): Observable<Cronograma> {
        return this.httpClient.post<Cronograma>(this.API, cronograma);
    }

    atualizar(cronograma: Cronograma): Observable<Cronograma> {
        return this.httpClient.put<Cronograma>(this.API, cronograma);
    }

    consultarPorId(id: number): Observable<Cronograma> {
        return this.httpClient.get<Cronograma>(this.API + '/' + id);
    }

    listarTodos(): Observable<Array<Cronograma>> {
        return this.httpClient.get<Array<Cronograma>>(this.API + '/todos');
    }

    listarComSeletor(seletor: CronogramaSeletor) {
        return this.httpClient.post<Array<Cronograma>>(this.API + '/filtro', seletor);
    }

    contarTotalRegistros(seletor: CronogramaSeletor): Observable<number> {
        return this.httpClient.post<number>(this.API + '/contar', seletor);
    }

    contarPaginas(seletor: CronogramaSeletor): Observable<number> {
        return this.httpClient.post<number>(this.API + '/total-paginas', seletor);
    }
}