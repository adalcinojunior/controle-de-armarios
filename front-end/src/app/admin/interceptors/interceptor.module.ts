import { Injectable, NgModule } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req.clone();
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        if(token && refreshToken){
            request = req.clone({
                setHeaders: {
                    Authorization: `JWT ${token}`,
                    refreshToken: refreshToken
                }
            });
        }
        return next.handle(request);
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