/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/body-parser/body-parser.d.ts" />

import express = require('express');
import bodyParser = require('body-parser');
import path = require('path');
import mongoose = require('mongoose');
import userRouter = require('./api/routes/userRoutes');

const app = express();
const db = mongoose.connect('mongodb://localhost/craAPI');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join( __dirname, '/client')));
app.use('/api/users', userRouter);

const port = process.env.PORT || 3000;

app.get('/', (req, res): void => {
   res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.listen(port, () => {
   console.log('Listening to port', port);
});