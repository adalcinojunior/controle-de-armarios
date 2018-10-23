import * as express from 'express';
import { UserController} from '../controllers/user';
import security from '../security/validToken';

export class RoutesUser{
    private userController: UserController;
    
    constructor(app:express.Application){
        this.userController = new UserController();
        this.routes(app);
    }
    private routes(app):void{
        
        //  - - - - - Rotas que devem ser protegidas - - - - -
        app
            .use('/users',security.validToken())// Middleware para validar token de acesso.

            .route('/users')

            .get(this.userController.getAll)

            .post(this.userController.create);

        app
            .use('/users',security.validToken())// Middleware para validar token de acesso.    

            .route('/users/:userId')
        
            .get(this.userController.getOne)

            .delete(this.userController.delete)

            .put(this.userController.update);
        
        //  - - - - - - - - - - - - - - - - - 

    }
}