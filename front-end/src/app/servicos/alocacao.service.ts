import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable()
export class AlocacaoService {

    constructor(private http: Http) { }

    buscar(busca: string): Promise<any> {
        return this.http.get(environment.urlAPI + '/allocations?query=' + busca)
            .toPromise()
            .then((response) => response.json())
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    buscarTodas(): Promise<any> {
        return this.http.get(environment.urlAPI + '/allocations')
            .toPromise()
            .then((response) => response.json())
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    salvar(alocacao): Promise<any> {
        return this.http.post(environment.urlAPI + '/allocations', alocacao)
            .toPromise()
            .then(response => response.json())
            .catch((err) => {
                return Promise.reject(err);
            });
    }


    devolver(devolucao): Promise<any> {
        return this.http.post(environment.urlAPI + '/allocations/devolution/' + devolucao.codeKey, devolucao)
            .toPromise()
            .then(response => response.json())
            .catch((err) => {
                return Promise.reject(err);
            });

    }

    status(): Promise<any> {
        return this.http.get(environment.urlAPI + '/allocations/status')
            .toPromise()
            .then(response => response.json())
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    quantidadePorMes(ano: string): Promise<any> {
        let data: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
       return this.http.get(environment.urlAPI + '/allocations?query=' + ano)
            .toPromise()
            .then(response => {
                let allocations = response.json();
                allocations.forEach(element => {
                    switch(element.entryDate.substring(0,7)){
                        case ano+'-01':
                            data[0]++;
                            break;
                        case ano+'-02':
                            data[1]++;
                            break;
                        case ano+'-03':
                            data[2]++;
                            break;
                        case ano+'-04':
                            data[3]++;
                            break;
                        case ano+'-05':
                            data[4]++;
                            break;
                        case ano+'-06':
                            data[5]++;
                            break;
                        case ano+'-07':
                            data[6]++;
                            break;
                        case ano+'-08':
                            data[7]++;
                            break;
                        case ano+'-09':
                            data[8]++;
                            break;
                        case ano+'-10':
                            data[9]++;
                            break;
                        case ano+'-11':
                            data[10]++;
                            break;
                        case ano+'-12':
                            data[11]++;
                            break;
                    }
                });
                return data;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }
}
