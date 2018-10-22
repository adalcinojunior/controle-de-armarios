import { Request, Response } from 'express';

// Quando tiver o atributo query na requisição
const md_query = function (req: Request, res: Response, next: Function) {
    const regex = new RegExp(req.query['query']);
    const filters = [
        { "userName": { $regex: regex } },
        { "email": { $regex: regex } },
        { "status": { $regex: regex } },
        { "codeKey": { $regex: regex } },
        { "entryDate.date": { $regex: regex } },
        { "entryDate.hour": { $regex: regex } },
        { "devolutionDate.date": { $regex: regex } },
        { "devolution.hour": { $regex: regex } }
    ];
    req.body.filters = { $or: filters };
    next();
}

// Quando a busca for com datas
const md_date = function (req: Request, res: Response, next: Function) {
    const regex = new RegExp(req.query['date']);
    //console.log('REGEX: ' + regex);
    req.body.filters = { "entryDate.date": { $regex: regex } };
    next();
}

export const middleware = function (req: Request, res: Response, next: Function) {

    if (JSON.stringify(req.query) != '{}') {
        if (req.query['query']) {
            md_query(req, res, next);
        } else if((req.query['date'])){
            md_date(req, res, next);
        }
    } else {
        req.body.filters = {};
        next();
    }

}

class FiltrosEPesquisa{

    getMiddleware(): Function{
        return middleware;
    }

}
export default new FiltrosEPesquisa();