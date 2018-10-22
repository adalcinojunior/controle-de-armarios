import * as HttpStatus from 'http-status';
import { Request, Response } from 'express';
import User from '../models/user';

export class UserController {

    public getAll(req: Request, res: Response) {
        return User.find({})
            .then(users => res.status(HttpStatus.OK).json(users))
            .catch(err => res.status(HttpStatus.BAD_REQUEST).json(err));
    }

    public getOne(req: Request, res: Response) {
        return User.findOne({ _id: req.params.userId })
            .then(user =>  res.status(HttpStatus.OK).json(user))
            .catch(err =>  res.status(HttpStatus.BAD_REQUEST).json(err));
    }

    public create(req: Request, res: Response) {
        return User.create(req.body)
            .then(user => res.status(HttpStatus.OK).json(user))
            .catch(err => res.status(HttpStatus.BAD_REQUEST).json(err));
    }

    public update(req: Request, res: Response) {
        return User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
            .then(user => res.status(HttpStatus.OK).json(user))
            .catch(err => res.status(HttpStatus.BAD_REQUEST).json(err));
    }

    public delete(req: Request, res: Response) {
        return User.findByIdAndRemove({_id: req.params.userId})
            .then(() => res.status(HttpStatus.NO_CONTENT).end())
            .catch(err => res.status(HttpStatus.BAD_REQUEST).json(err));
    }

}