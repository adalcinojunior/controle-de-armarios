import * as HttpStatus from 'http-status';
import { Request, Response } from 'express';
import AllocationModel from '../models/allocation';
import { EnumStatus } from '../models/allocation';

export class AllocationController {

    public getAllocationAll(req: Request, res: Response ) {
        let filters = req.body.filters;

        console.log(JSON.stringify(filters));

        return AllocationModel.find({ $or: filters })
            .then(allocations => {
                res.status(HttpStatus.OK).send(allocations);
            })
            .catch(err => {
                res.status(HttpStatus.BAD_REQUEST).send(err);
            });

    }

    public getAllocationId(req: Request, res: Response) {
        return AllocationModel.findOne({ _id: req.params.allocationId })
            .then(allocation => {
                res.status(HttpStatus.OK);
                res.send(allocation);
            })
            .catch(err => {
                res.status(HttpStatus.BAD_REQUEST)
                res.send(err);
            });
    }

    public addNewAllocation(req: Request, res: Response) {
        // Valido o corpo da requisição
        if (req.body === null || req.body === undefined || JSON.stringify(req.body) === "{}") {
            return function () {
                res.status(HttpStatus.BAD_REQUEST);
                res.send({ message: "Request invalid!" });
            }();
        }

        // Verifico se a chave estar disponivel
        AllocationModel.find({ codeKey: req.body.codeKey })
            .then((allocations) => {
                allocations.forEach((allocation: any) => {
                    // Caso onde o armario ja foi devolvido
                    if (allocation && allocation.status != EnumStatus[0]) {// DEVOLVIDO
                        res.status(HttpStatus.BAD_REQUEST)
                        res.send({ message: 'Armario ocupado!' });
                        throw new Error('Armario ocupado!');
                    }
                });

                // Salva o registro
                let newAllocation = new AllocationModel(req.body);
                return newAllocation.save()
                    .then((allocation) => {
                        res.status(HttpStatus.CREATED)
                        res.send(allocation);
                    })
                    .catch((err) => {
                        console.log("problemas em salvar!!" + err);
                        res.status(HttpStatus.BAD_REQUEST)
                        res.send(err);
                    });
            });
    }
    public updateAllocation(req: Request, res: Response) {

        return AllocationModel.findOneAndUpdate({ _id: req.params.allocationId }, req.body, { new: true })
            .then(allocation => {
                res.status(HttpStatus.OK);
                res.send(allocation);
            })
            .catch(err => {
                res.status(HttpStatus.BAD_REQUEST);
                res.send(err);
            });
    }

    public deleteAllocation(req: Request, res: Response) {
        return AllocationModel.findByIdAndRemove({ _id: req.params.allocationId })
            .then(() => {
                res.status(HttpStatus.NO_CONTENT);
                res.send();
            })
            .catch(err => {
                res.status(HttpStatus.UNPROCESSABLE_ENTITY);
                res.send(err)
            });
    }

    public devolutionKey(req: Request, res: Response) {
        // Valido o corpo da requisição
        if (req.body === null || req.body === undefined || JSON.stringify(req.body) === "{}") {
            return function () {
                res.status(HttpStatus.BAD_REQUEST);
                res.send({ message: "Request invalid!" });
            }();
        }

        let devolution = { userName: req.body.userName, codeKey: req.body.codeKey };
        let devolutionDate = req.body.devolutionDate;
        
        return AllocationModel.find(devolution)
            .then((allocations) => {
                if (allocations.length > 0) {
                    allocations.forEach(allocation => {
                        let date = new Date();
                        AllocationModel.findOneAndUpdate({ _id: allocation._id, codeKey: req.params.key }, { status: EnumStatus[0], devolutionDate: {date:devolutionDate.date,hour:devolutionDate.hour} })
                            .catch((err) => {
                                throw new Error('Erro na devoluçao das chaves! ' + err);
                            });
                    });
                    res.status(HttpStatus.OK);
                    res.send({ message: 'Chave devolvida com sucesso!' });
                }else{
                    res.status(HttpStatus.CONFLICT);
                    res.send({ message: 'Conflito entre chave e usuário!' });
                }
            })
            .catch((err) => {
                res.status(HttpStatus.BAD_REQUEST);
                res.send(err)
            });
    }

    public getStatus(req: Request, res: Response) {
        
        return AllocationModel.collection.stats()
            .then((data)=>{
                res.status(HttpStatus.OK);
                res.send(data);
            })
            .catch((err)=>{
                res.status(HttpStatus.BAD_REQUEST);
                res.send(err)
            });
    }
}