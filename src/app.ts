/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/body-parser/body-parser.d.ts" />

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as mongoose from 'mongoose';
import { config } from './api/config';
import userRouter from './api/users/userRoutes';
import clientRouter from './api/clients/clientRoutes';
import craRouter from './api/cras/craRoutes';

const app = express();
const db = mongoose.connect(config.mongo.connectionString);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join( __dirname, '/client')));

app.use('/api/users', userRouter);
app.use('/api/clients', clientRouter);
app.use('/api/users/:userId/cras', craRouter);

const port = process.env.PORT || 3000;

app.get('/', (req, res): void => {
   res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.listen(port, () => {
   console.log('Listening to port', port);
});