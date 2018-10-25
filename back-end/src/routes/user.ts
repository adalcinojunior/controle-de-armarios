import * as express from 'express';
import { UserController} from '../controllers/user';
import security from '../security/validToken';

export class RoutesUser{
    private userController: UserController;
    
    constructor(app:express.Application, prefix: string){
        this.userController = new UserController();
        this.routes(app, prefix);
    }
    private routes(app, prefix):void{
        
        //  - - - - - Rotas que devem ser protegidas - - - - -
        app
            .use(prefix+'/users',security.validToken())// Middleware para validar token de acesso.

            .route(prefix+'/users')

            .get(this.userController.getAll)

            .post(this.userController.create);

        app
            .use(prefix+'/users',security.validToken())// Middleware para validar token de acesso.    

            .route(prefix+'/users/:userId')
        
            .get(this.userController.getOne)

            .delete(this.userController.delete)

            .put(this.userController.update);
        
        //  - - - - - - - - - - - - - - - - - 

    }
}