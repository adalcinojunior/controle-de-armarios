import * as express from 'express';
import { AllocationController} from '../controllers/allocation';
import { middleware } from '../middleware/middleware';

export class RoutesAllocation{
    private allocationController: AllocationController;
    
    constructor(app:express.Application){
        this.allocationController = new AllocationController();
        this.routes(app);
    }
    private routes(app):void{
        //  - - - - - Rotas livres - - - - -
        app
            .use(middleware)
            
            .route('/allocations')

            .get(this.allocationController.getAllocationAll);

        app
            .route('/allocations')

            .post(this.allocationController.addNewAllocation);

        app.route('/allocations/devolution/:key')
                
            .post(this.allocationController.devolutionKey);
        //  - - - - - - - - - - - - - - - - - 


        //  - - - - - Rotas que devem ser protegidas - - - - -
        app
            .route('/allocations/status')
            
            .get(this.allocationController.getStatus)
        
        app
            .route('/allocations/removeall')
            
            .delete(this.allocationController.deleteAllAllocation)


        app.route('/allocations/:allocationId')
        
            .get(this.allocationController.getAllocationId)

            .delete(this.allocationController.deleteAllocation)

            .put(this.allocationController.updateAllocation);
        
        //  - - - - - - - - - - - - - - - - - 

    }
}