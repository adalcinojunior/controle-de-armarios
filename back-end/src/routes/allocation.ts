import * as express from 'express';
import { AllocationController} from '../controllers/allocation';
import  middleware  from '../middleware/middleware';
import security from '../security/validToken';

export class RoutesAllocation{
    private allocationController: AllocationController;
    
    constructor(app:express.Application){
        this.allocationController = new AllocationController();
        this.routes(app);
    }
    private routes(app):void{
        //  - - - - - Rotas livres - - - - -
        app
            .use(middleware.getMiddleware())// Middleware de busca
            
            .route('/allocations')

            .get(this.allocationController.getAll);

        app
            .route('/allocations')

            .post(this.allocationController.create);

        app
            .route('/allocations/devolution/:key')
                
            .post(this.allocationController.devolutionKey);
        //  - - - - - - - - - - - - - - - - - 


        //  - - - - - Rotas que devem ser protegidas - - - - -
        app
            .use('/allocations/status',security.validToken())// Middleware para validar token de acesso.

            .route('/allocations/status')

            .get(this.allocationController.getStatus);
        
        app      
            .use('/allocations/removeall',security.validToken())// Middleware para validar token de acesso.

            .route('/allocations/removeall')
            
            .delete(this.allocationController.deleteAll);
        
        app
            .use('/allocations/:allocationId',security.validToken())// Middleware para validar token de acesso.

            .route('/allocations/:allocationId')
        
            .get(this.allocationController.getOne)

            .delete(this.allocationController.delete)

            .put(this.allocationController.update);
        
        //  - - - - - - - - - - - - - - - - - 

    }
}