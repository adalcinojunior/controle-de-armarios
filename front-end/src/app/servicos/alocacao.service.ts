import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class AlocacaoService {

    constructor(
        private httpClient: HttpClient
    ) { }

    buscar(busca: string): Promise<any> {
        return this.httpClient.get<any>(environment.urlAPI + '/allocations' + busca)
            .toPromise()
            .then(response => response)
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    buscarTodas(): Promise<any> {
        return this.httpClient.get<any>(environment.urlAPI + '/allocations')
            .toPromise()
            .then(response => response)
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    salvar(alocacao): Promise<any> {
        return this.httpClient.post<any>(environment.urlAPI + '/allocations', alocacao)
            .toPromise()
            .then(response => response)
            .catch((err) => {
                return Promise.reject(err);
            });
    }


    devolver(devolucao): Promise<any> {
        return this.httpClient.post<any>(environment.urlAPI + '/allocations/devolution/' + devolucao.codeKey, devolucao)
            .toPromise()
            .then(response => response)
            .catch((err) => {
                return Promise.reject(err);
            });

    }

    status(): Promise<any> {
        
        return this.httpClient.get<any>('/allocations/status')
            .toPromise()
            .then(response => response)
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    deletarTodos(): Promise<any> {
        return this.httpClient.delete<any>(environment.urlAPI + '/allocations/removeall')
            .toPromise()
            .then(() => true)
            .catch((err) => {
                return Promise.reject(err);
            });
    }

}
