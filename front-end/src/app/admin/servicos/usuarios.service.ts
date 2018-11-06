import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient: HttpClient) { }

  buscarTodos(busca: string): Promise<any>{
    return this.httpClient.get<any>('/api/v1/users'+busca)
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

  atualizar(id: string,user: any): Promise<any>{
    return this.httpClient.put<any>('/api/v1/users/'+id,user)
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
