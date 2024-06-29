import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TipoDeLimpeza } from '../model/tipoDeLimpeza';

@Injectable({
    providedIn: 'root'
})
export class TipoDeLimpezaService {
    private readonly API = 'http://144.22.190.101:8080/api/tipo-de-limpeza';

    constructor(private httpClient: HttpClient) { }

    listarTodos(): Observable<Array<TipoDeLimpeza>> {
        return this.httpClient.get<Array<TipoDeLimpeza>>(this.API + '/todos');
    }
}
