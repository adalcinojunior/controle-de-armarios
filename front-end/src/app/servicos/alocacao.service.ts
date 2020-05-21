import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AlocacaoService {

    constructor(
        private httpTeste: Http,
        private httpClient: HttpClient
    ) { }

    buscar(busca: string): Promise<any> {
        return this.httpTeste.get('/api/v1/allocations' + busca)
            .toPromise()
            .then((response) => response.json())
            .catch((err) => {
                return Promise.reject(err.json());
            });
    }

    buscarTodas(): Promise<any> {
        return this.httpTeste.get('/api/v1/allocations')
            .toPromise()
            .then((response) => response.json())
            .catch((err) => {
                return Promise.reject(err.json());
            });
    }

    salvar(alocacao): Promise<any> {
        return this.httpTeste.post('/api/v1/allocations', alocacao)
            .toPromise()
            .then(response => response.json())
            .catch((err) => {
                return Promise.reject(err.json());
            });
    }


    devolver(devolucao): Promise<any> {
        return this.httpTeste.post('/api/v1/allocations/devolution/' + devolucao.codeKey, devolucao)
            .toPromise()
            .then(response => response.json())
            .catch((err) => {
                return Promise.reject(err.json());
            });

    }

    status(): Promise<any> {
        return this.httpClient.get<any>('/api/v1/allocations/status')
            .toPromise()
            .then(response => response)
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    deletarTodos(): Promise<any>{
        return this.httpTeste.delete('/api/v1/allocations/removeall')
            .toPromise()
            .then(() => true)
            .catch((err) => {
                return Promise.reject(err.json());
            });
    }

}
