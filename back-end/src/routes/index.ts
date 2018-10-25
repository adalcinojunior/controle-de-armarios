import * as express from 'express';
import { RoutesAllocation } from './allocation';
import { RoutesUser } from  './user';
import Autentication  from '../security/autentication';

export class Routes {
    private routeAllocation: RoutesAllocation;
    private routerUser: RoutesUser;
    private prefix = '/api/v1';

    constructor(app: express.Application) {
        this.routeAllocation =  new RoutesAllocation(app, this.prefix);
        this.routerUser = new RoutesUser(app, this.prefix);
        this.routes(app);
    }

    private routes(app): void {
        
        app.route(this.prefix+'/login')
             .post(Autentication.authenticate);

        app.route(this.prefix+'/refresh')
            .post(Autentication.refreshToken);

    }
}