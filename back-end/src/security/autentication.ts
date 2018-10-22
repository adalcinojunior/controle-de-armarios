/**
 * Classe utilizada para autenticar o login do usuario
 */
import * as jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import User from '../models/user';

// import * as randToken from "rand-token";

export class Autentication {
    private static listTokens: { [id: string]: string; } = {};

    public authenticate(req: Request, res: Response) {
        if (req.headers.authorization) {
            let user = new Buffer(req.headers.authorization.split(" ")[1], 'base64').toString().split(':');
            User.findOne({ userName: user[0] })
                .then(response => {                 
                    if(response.password == user[1]){
                        let token = jwt.sign({ user: response.userName }, process.env.SECRET_JWT);
                        // Adicionar { expiresIn: 300 } para o token expirar
                        // let refreshToken = randToken.uid(256);
                        // Autentication.setRefreshToken(refreshToken, id);//adiciono o refreshToken a lista
                        res.status(200).json({ auth: true, token: token });
                    }else{
                        res.status(400).json({ message: 'Login inválido!' });
                    }
                })
                .catch(err => {  
                    console.log(err);                  
                    res.status(400).json({ message: 'Login inválido!', error: err});
                });
        } else {                      
            res.status(400).json({ message: 'Login inválido!' });
        }
    }

    /*
    public refreshToken(req: Request, res: Response) {

        let refreshToken: string = <string>req.headers.refresh_token;
        let token = req.headers.authorization.split(" ")[1];
        let payload: any = jwt.decode(token);
        let userId: string = payload.id;

        if (userId) {
            let refresTokenLocal: string = Autentication.getRefreshTokenId(userId);

            if (refresTokenLocal === refreshToken) {//refresh token é valido
                let newtoken = jwt.sign({ userId }, "mysecret", { expiresIn: 30 });
                let newrefreshToken = randToken.uid(256);
                Autentication.setRefreshToken(newrefreshToken, userId);//substituir o novo refreshToken a lista
                res.status(200).send({ auth: true, token: newtoken, refreshToken: newrefreshToken });
            }
            else {
                res.status(400).send('RefreshToken inválido!');
            }
        } else {
            res.status(400).send('Token inválido ou expirado!');
        }

    }
    */

    public static setRefreshToken(refreshToken: string, id: string): void {
        Autentication.listTokens[id] = refreshToken;
    }

    public static getRefreshTokenId(id: string): string {
        return Autentication.listTokens[id];
    }

}
export default new Autentication();