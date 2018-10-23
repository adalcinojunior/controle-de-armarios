import * as mongoose from 'mongoose'; 
import { RoutesAllocation } from './allocation';
import { RoutesUser } from  './user';
import Autentication  from '../security/autentication';

export class Routes {
    private routeAllocation: RoutesAllocation;
    private routerUser: RoutesUser;

    constructor(app: mongoose.Application) {
        this.routeAllocation =  new RoutesAllocation(app);
        this.routerUser = new RoutesUser(app);
        this.routes(app);
    }

    private routes(app: mongoose.Application): void {
        
         app.route('/login')
             .post(Autentication.authenticate);

        app.route('/refresh')
            .post(Autentication.refreshToken);

    }
}