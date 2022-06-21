import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import mongoSanitize from 'express-mongo-sanitize';
import { userApi } from './routes';
import runDatabase from './db';

config({path: './.env'});
const app: Express = express();
const PORT = process.env.PORT || 3001; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(mongoSanitize())
app.use(cors({origin: ['http://localhost:3000'], methods: ['POST', 'GET']}));
app.use('/api/user', userApi);
app.use(helmet()); 
runDatabase(process.env.DATABASE);

app.listen(PORT, () => {
    console.log(`☀ [server]: Running a Express API server at http://localhost:${PORT}/api/user`);
});