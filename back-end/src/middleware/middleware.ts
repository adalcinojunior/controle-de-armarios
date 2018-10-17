import { Request, Response } from 'express';

export const middleware_pesquisa = function (req: Request, res: Response, next: Function) {
    let busca: string;
    if (req.query['query']) {
        busca = req.query['query'];
    }
    const regex = new RegExp(busca);
       
    const filters = [
        { "userName": { $regex: regex } },
        { "email": { $regex: regex } },
        { "status": { $regex: regex } },
        
        

    ];
    req.body.filters = filters;
    next();
}

export const middleware_data = function (req: Request, res: Response, next: Function) {
    console.log(req.query);

    if (req.query['ano']) {
        
    }

    if (req.query['mes']) {
        
    }

    if (req.query['dia']) {
        
    }

    let busca: string;
    if (req.query['query']) {
        busca = req.query['query'];
    }
    const regex = new RegExp(busca);
    
    
    const filters = [
        { "userName": { $regex: regex } },
        { "email": { $regex: regex } },
        { "status": { $regex: regex } },
        { "entryDate": { $regex: regex } }
    ];
    req.body.filters = filters;
    next();
}