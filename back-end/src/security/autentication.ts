/**
 * Classe utilizada para autenticar o login do usuario
 */
import * as jwt from 'jsonwebtoken';
import * as HttpStatus from 'http-status';
import { Request, Response } from "express";
import User from '../models/user';
import * as randToken from "rand-token";
import TokenController from '../controllers/token';

export class Autentication {

    public authenticate(req: Request, res: Response) {
        
        if (req.headers.authorization) {
            let user = new Buffer(req.headers.authorization.split(" ")[1], 'base64').toString().split(':');
            User.findOne({ userName: user[0] })
                .then(response => {
                    if (response && response.password == user[1]) {
                        let token = jwt.sign({ _id:response._id,user: response.userName , type: response.type}, process.env.SECRET_JWT);
                        // Adicionar { expiresIn: 300 } para o token expirar
                        let refreshToken = randToken.uid(256);
                        // adiciono o refreshToken ao banco
                        TokenController.create({ user: response.userName, refreshtoken: refreshToken })
                            .then(() => {
                                res.status(HttpStatus.OK).json({ auth: true, token: token, refreshToken: refreshToken });
                            })
                            .catch((err) => {
                                console.error('Erro ao adicionar refreshToken ao banco. Detalhes: ' + err);
                                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Problemas ao realizar login!' })
                            });

                    } else {
                        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Login inválido!' });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(HttpStatus.BAD_REQUEST).json({ message: 'Login inválido!', error: err });
                });
        } else {
            res.status(HttpStatus.BAD_REQUEST).json({ message: 'Login inválido!' });
        }
    }


    public refreshToken(req: Request, res: Response) {
        
        let refreshToken: string = <string>req.headers['refreshtoken'];
        let token = req.headers.authorization.split(" ")[1];
        let payload: any = jwt.decode(token);
        let user: string = payload.user;

        if (user) {
            TokenController.getOneByUser(user)
                .then((refresTokenLocal) => {
                    if (refresTokenLocal.refreshtoken === refreshToken) {//refresh token é valido
                        let newtoken = jwt.sign({ user }, process.env.SECRET_JWT); // { expiresIn: 60 }
                        let newrefreshToken = randToken.uid(256);// Novo token de atualização
                        //substituir o novo refreshToken a lista
                        TokenController.update(refresTokenLocal._id,{user: user, refreshtoken: newrefreshToken})
                            .then(() => {
                                res.status(HttpStatus.OK).json({ auth: true, token: newtoken, refreshToken: newrefreshToken });
                            })
                            .catch(err =>{
                                console.error('Autenticate - Problemas em atualizar refreshtoken. Detalhes: '+err);
                                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Problemas ao validar refresh token!' });
                            });                        
                    }
                    else {     
                        console.error('Autenticate - RefreshToken da requicao diferente do banco! ');
                        res.status(HttpStatus.BAD_REQUEST).json('RefreshToken inválido!');
                    }
                })
                .catch(err => {
                    console.error('Autenticate - Erro ao buscar refreshtoken pelo usuário. Detalhes: '+err);
                    res.status(HttpStatus.BAD_REQUEST).json('Token inválido ou expirado!')
                });
        } else {
            res.status(HttpStatus.BAD_REQUEST).json('Token inválido!');
        }

    }

    public logout(req: Request, res: Response){        
        let refreshToken: string = <string>req.headers['refreshtoken']; 
        return TokenController.deleteByRefreshToken(refreshToken)
            .then(response => {
                res.status(HttpStatus.OK).json({ message: response });
            })
            .catch(err => {
                res.status(HttpStatus.BAD_REQUEST).json(err)
            });
    }

}
export default new Autentication();