import { Request, Response } from 'express';

export const middleware = function (req: Request, res: Response, next: Function) {

    if (JSON.stringify(req.query) != '{}') {
        const regex = new RegExp(req.query['query']);
        const filters = [
            { "userName": { $regex: regex } },
            { "type": { $regex: regex } }
        ];
        req.body.filters = { $or: filters };
    } else {
        req.body.filters = {};        
    }
    next();
}

class FiltrosEPesquisaUser {

    getMiddleware(): Function {
        return middleware;
    }

}
export default new FiltrosEPesquisaUser();