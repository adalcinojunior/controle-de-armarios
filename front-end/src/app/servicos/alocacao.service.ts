import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AlocacaoService {

    constructor(
        private httpClient: HttpClient
    ) { }

    buscar(busca: string): Promise<any> {
        return this.httpClient.get<any>('/api/v1/allocations' + busca)
            .toPromise()
            .then(response => response)
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    buscarTodas(): Promise<any> {
        return this.httpClient.get<any>('/api/v1/allocations')
            .toPromise()
            .then(response => response)
            .catch((err) => {                
                return Promise.reject(err);
            });
    }

    salvar(alocacao): Promise<any> {
        return this.httpClient.post<any>('/api/v1/allocations', alocacao)
            .toPromise()
            .then(response => {
                if(response == undefined){
                    return Promise.reject({message:'Armario ocupado!'});
                }                
            })
            .catch((err) => {                
                return Promise.reject(err);
            });
    }


    devolver(devolucao): Promise<any> {
        return this.httpClient.post<any>('/api/v1/allocations/devolution/' + devolucao.codeKey, devolucao)
            .toPromise()
            .then(response => response)
            .catch((err) => {
                return Promise.reject(err);
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

    deletarTodos(): Promise<any> {
        return this.httpClient.delete<any>('/api/v1/allocations/removeall')
            .toPromise()
            .then(() => true)
            .catch((err) => {
                return Promise.reject(err);
            });
    }

}
