import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient: HttpClient) { }

  buscarTodos(): Promise<any>{
    return this.httpClient.get<any>('/api/v1/users')
      .toPromise()
      .then(response => response)
      .catch(err => Promise.reject(err));
  }
  
  salvar(user: any): Promise<any>{
    return this.httpClient.post<any>('/api/v1/users',user)
      .toPromise()
      .then(response => response)
      .catch(err => Promise.reject(err));
  }

  excluir(id: string): Promise<any>{
    return this.httpClient.delete<any>('/api/v1/users/'+id)
      .toPromise()
      .then(response => response)
      .catch(err => Promise.reject(err));
  }
}
