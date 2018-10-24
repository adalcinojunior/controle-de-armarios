/**
 * Modulo utilizado para valiar o token recebido na requisição.
 */
import * as jwt from 'jsonwebtoken';
import * as HttpStatus from 'http-status';

export const md_validToken = function md_validToken(req, res, next) {
  
  if (req.headers.authorization) {
    
    var token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(HttpStatus.UNAUTHORIZED).send({ auth: false, message: 'Informe um token de acesso!' });

    jwt.verify(token, process.env.SECRET_JWT , function (err, decoded) {//decoded é o payload descriptado
      if (err) {
        return res.status(HttpStatus.UNAUTHORIZED).send({ auth: false, message: 'Token inválido!' });
      }
      // Se estiver tudo OK permite o acesso.
      next();
    });

  }else{
    return res.status(HttpStatus.BAD_REQUEST).send({ auth: false, message: 'Informe o token de acesso!' });
  } 

}

export class ValidToken{
    validToken() {
        return md_validToken;
    }
}

export default new ValidToken();