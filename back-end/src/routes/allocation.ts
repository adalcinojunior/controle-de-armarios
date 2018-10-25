import * as express from 'express';
import { AllocationController} from '../controllers/allocation';
import  middleware  from '../middleware/middleware';
import security from '../security/validToken';

export class RoutesAllocation{
    private allocationController: AllocationController;
    
    constructor(app:express.Application, prefix: string){
        this.allocationController = new AllocationController();
        this.routes(app,prefix);
    }
    private routes(app, prefix: string):void{
        //  - - - - - Rotas livres - - - - -
        app
            .use(middleware.getMiddleware())// Middleware de busca
            
            .route(prefix+'/allocations')

            .get(this.allocationController.getAll);

        app
            .route(prefix+'/allocations')

            .post(this.allocationController.create);

        app
            .route(prefix+'/allocations/devolution/:key')
                
            .post(this.allocationController.devolutionKey);
        //  - - - - - - - - - - - - - - - - - 


        //  - - - - - Rotas que devem ser protegidas - - - - -
        app
            .use(prefix+'/allocations/status',security.validToken())// Middleware para validar token de acesso.

            .route(prefix+'/allocations/status')

            .get(this.allocationController.getStatus);
        
        app      
            .use(prefix+'/allocations/removeall',security.validToken())// Middleware para validar token de acesso.

            .route(prefix+'/allocations/removeall')
            
            .delete(this.allocationController.deleteAll);
        
        app
            .use(prefix+'/allocations/:allocationId',security.validToken())// Middleware para validar token de acesso.

            .route(prefix+'/allocations/:allocationId')
        
            .get(this.allocationController.getOne)

            .delete(this.allocationController.delete)

            .put(this.allocationController.update);
        
        //  - - - - - - - - - - - - - - - - - 

    }
}