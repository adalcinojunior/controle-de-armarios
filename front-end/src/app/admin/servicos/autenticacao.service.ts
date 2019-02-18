import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface IAuth {
    userName: String;
    password: String;
}
@Injectable()
export class AuthService {

    constructor(private httpClient: HttpClient) { }

    autenticar(auth: IAuth): Promise<any>{
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Basic ' + btoa(auth.userName + ':' + auth.password)
            })
          };

        return this.httpClient
            .post<any>('/api/v1/login', auth, httpOptions)
            .toPromise()
            .then(response => response)
            .catch(err => Promise.reject(err));
    }

    refreshToken(): Promise<any> {
        return this.httpClient
            .post<any>('/api/v1/refresh',null)
            .toPromise()
            .then(response => response)
            .catch(err => Promise.reject(err));

    }

    logout(): Promise<any>{
        return this.httpClient
            .post<any>('/api/v1/logout',null)
            .toPromise()
            .then(response => response)
            .catch(err => Promise.reject(err));
    }

}