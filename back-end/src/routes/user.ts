import * as express from 'express';
import { UserController} from '../controllers/user';

export class RoutesUser{
    private userController: UserController;
    
    constructor(app:express.Application){
        this.userController = new UserController();
        this.routes(app);
    }
    private routes(app):void{
        
        //  - - - - - Rotas que devem ser protegidas - - - - -
        app
            .route('/users')

            .get(this.userController.getAll)

            .post(this.userController.create);

        app.route('/users/:userId')
        
            .get(this.userController.getOne)

            .delete(this.userController.delete)

            .put(this.userController.update);
        
        //  - - - - - - - - - - - - - - - - - 

    }
}