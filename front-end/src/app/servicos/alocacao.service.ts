import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable()
export class AlocacaoService {

    constructor(private http: Http) { }

    buscar(busca: string): Promise<any> {
      return this.http.get(environment.urlAPI + '/allocations?query='+busca)
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
}
