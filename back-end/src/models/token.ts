import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IToken{
    user: string;
    refreshtoken: string
} 

export const Token_Schema = new Schema({
    user: {
        type: String,
        required: 'Informe o usuário do token de atualização'
    },
    refreshtoken: {
        type: String,
        required: 'Informe o token de atualização'
    }
});

const Token_Model = mongoose.model('Token', Token_Schema);

export default Token_Model;