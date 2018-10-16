import app from "./app";
import * as dotenv from 'dotenv';

dotenv.load();
const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`API rodando na porta ${port}`);
});