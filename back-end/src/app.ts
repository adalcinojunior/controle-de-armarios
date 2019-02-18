import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import { Routes } from './routes/index';
import * as dotenv from 'dotenv';

dotenv.load();

class App{
    
    private app:express.Application;
    private mongoUrl: string;
    private routes: Routes;
    constructor(){
        this.app = express();
        this.mongoUrl = process.env.URL_DATA_BASE;
        this.config();
        this.routes = new Routes(this.app);
    }

    config(): void {
        this.app.use(morgan('dev'));         
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false}));
        this.mongoSetup();
    }

    private mongoSetup(): void{
        mongoose.connect(this.mongoUrl,{useNewUrlParser: true});    
    }

    public getApp():express.Application{
        return this.app;
    }
}

export default new App().getApp();