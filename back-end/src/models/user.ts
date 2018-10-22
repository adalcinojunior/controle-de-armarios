import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const User_Schema = new Schema({
    userName: {
        type: String,
        required: 'Informe o nome do usuário'
    },
    password: {
        type: String,
        required: 'Informe a senha do usuário'
    }
});

const User_Model = mongoose.model('User',User_Schema);

export default User_Model;