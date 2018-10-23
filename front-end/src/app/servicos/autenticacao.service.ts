import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { environment } from '../../environments/environment';

export interface IAuth {
    userName: String;
    password: String;
}
@Injectable()
export class AuthService {

    constructor(private http: Http) { }

    autenticar(auth: IAuth): Promise<any>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Basic ' + btoa(auth.userName + ':' + auth.password));

        return this.http
            .post(environment.urlAPI + '/login', auth,{headers: headers})
            .toPromise()
            .then(response => response)
            .catch(err => Promise.reject(err));
    }

}