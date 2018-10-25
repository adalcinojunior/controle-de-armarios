import { Injectable, NgModule } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (req.url !== '/api/v1/login') {

            const token = localStorage.getItem('token');
            const refreshToken = localStorage.getItem('refreshToken');

            const request = req.clone({
                setHeaders: {
                    Authorization: `JWT ${token}`,
                    refreshToken: refreshToken
                }
            });

            return next.handle(request);
        } else {

        }
        return next.handle(req);
    }
}


@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpsRequestInterceptor,
            multi: true,
        },
    ],
})

export class Interceptor { }