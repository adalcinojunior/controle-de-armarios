import * as express from 'express';
import { AllocationController} from '../controllers/allocation';
import  middleware  from '../middleware/middleware';

export class RoutesAllocation{
    private allocationController: AllocationController;
    
    constructor(app:express.Application){
        this.allocationController = new AllocationController();
        this.routes(app);
    }
    private routes(app):void{
        //  - - - - - Rotas livres - - - - -
        app
            .use(middleware.getMiddleware())
            
            .route('/allocations')

            .get(this.allocationController.getAll);

        app
            .route('/allocations')

            .post(this.allocationController.create);

        app.route('/allocations/devolution/:key')
                
            .post(this.allocationController.devolutionKey);
        //  - - - - - - - - - - - - - - - - - 


        //  - - - - - Rotas que devem ser protegidas - - - - -
        app
            .route('/allocations/status')
            
            .get(this.allocationController.getStatus)
        
        app
            .route('/allocations/removeall')
            
            .delete(this.allocationController.deleteAll)


        app.route('/allocations/:allocationId')
        
            .get(this.allocationController.getOne)

            .delete(this.allocationController.delete)

            .put(this.allocationController.update);
        
        //  - - - - - - - - - - - - - - - - - 

    }
}