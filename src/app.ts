/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/body-parser/body-parser.d.ts" />

import express = require('express');
import bodyParser = require('body-parser');
import path = require('path');
import mongoose = require('mongoose');
import config = require('./api/config');
import userRouter = require('./api/users/userRoutes');
import clientRouter = require('./api/clients/clientRoutes');

const app = express();
const db = mongoose.connect(config.mongo.connectionString);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join( __dirname, '/client')));

app.use('/api/users', userRouter);
app.use('/api/clients', clientRouter);

const port = process.env.PORT || 3000;

app.get('/', (req, res): void => {
   res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.listen(port, () => {
   console.log('Listening to port', port);
});