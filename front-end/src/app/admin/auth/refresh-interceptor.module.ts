import { Injectable, NgModule } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './autenticacao.service';

@Injectable()
export class HttpsRequestErrosInterceptor implements HttpInterceptor {
    constructor(
        private AutenticarServico: AuthService
    ) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {

        return next.handle(req)
            .toPromise()
            .catch(err => {
                if (err.status == 401) {
                    return this.AutenticarServico.refreshToken()
                        .then((response) => {
                            // console.log(`Refresh token: ${response}`);
                            localStorage.clear();
                            localStorage.setItem('token', response.token);
                            localStorage.setItem('refreshToken', response.refreshToken);
                            const newrequest = req.clone({
                                setHeaders: {
                                    Authorization: `JWT ${response.token}`,
                                    refreshToken: response.refreshToken
                                }
                            });
                            //console.log('Reenviando requisição!');
                            return next.handle(newrequest)
                                .toPromise()
                                .then(response=> response)
                                .catch( err => err);

                        })
                        .catch(err => {
                            console.error(`Erro ao solicitar refresh token: ${err}`);
                        });
                }
            });

    }
}


@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpsRequestErrosInterceptor,
            multi: true,
        },
    ],
})

export class RefreshInterceptor { }