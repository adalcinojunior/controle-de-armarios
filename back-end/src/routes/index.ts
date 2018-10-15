import * as mongoose from 'mongoose'; 
import { RoutesAllocation } from './allocation';

export class Routes {
    private routeAllocation: RoutesAllocation;

    constructor(app: mongoose.Application) {
        this.routeAllocation =  new RoutesAllocation(app);
        this.routes(app);
    }

    private routes(app: mongoose.Application): void {
        
        // app.route('/login')
        //     .post(this.autentication.authenticate);

        // app.route('/refresh')
        //     .post(this.autentication.refreshToken);

    }
}