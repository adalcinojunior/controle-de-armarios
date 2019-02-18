import * as mongoose from  'mongoose';

const Schema = mongoose.Schema;

export enum EnumStatus{
    'DEVOLVIDO',
    'OCUPADO'
}

export interface IAllocation{
    userName: String;
    email:String;
    entryDate: String;
    devolutionDate: String;
    codeKey: String;
    status:EnumStatus;
}

export const AllocationSchema = new Schema({
    userName: {
        type: String,
        required: 'Informe o seu nome'
    },
    email:{
        type: String
    },
    entryDate: {
        date: String,
        hour: String
    },
    devolutionDate: {
        date: String,
        hour: String
    },
    codeKey: {
        type: String,
        required: 'Informe o numero da chave'
    },
    status:{
        type: EnumStatus
    }
});

const allocationModel = mongoose.model('Allocation',AllocationSchema);

export default allocationModel;
