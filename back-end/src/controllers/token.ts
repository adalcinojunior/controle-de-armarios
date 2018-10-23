import Token from '../models/token';
import { IToken } from '../models/token';

export class TokenController {

    public getAll(): Promise<any> {
        return Token.find({})
            .then(tokens => tokens)
            .catch(err => err);
    }

    public getOne(tokenId: string): Promise<any> {
        return Token.findOne({ _id: tokenId })
            .then(token =>  token)
            .catch(err => err);
    }

    public getOneByUser(user: string): Promise<any> {
        return Token.findOne({ user: user })
            .then(token =>  token)
            .catch(err => err);
    }

    public create(token: IToken): Promise<any> {
        return Token.create(token)
            .then(token => token)
            .catch(err => err);
    }

    public update(tokenId: string, token: IToken): Promise<any> {
        return Token.findOneAndUpdate({ _id: tokenId }, token, { new: true })
            .then(Token => token)
            .catch(err => err);
    }

    public delete(tokenId: string): Promise<any> {
        return Token.findByIdAndRemove({_id: tokenId})
            .then(() => 'Token removido com sucesso!' )
            .catch(err => err);
    }

}
export default new TokenController();