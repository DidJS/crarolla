/// <reference path="../../typings/express/express.d.ts" />
/// <reference path="../../typings/body-parser/body-parser.d.ts" />

import express = require('express');
import bodyParser = require('body-parser');
import path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

console.log(__dirname);
app.use(express.static(__dirname + '/../../public'));
//app.use(express.static(__dirname + '/../src/client/'));

const port = process.env.PORT || 3000;

app.get('/', (req, res): void => {
   res.sendFile(path.join(__dirname + '/../../src/client/index.html'));
});

app.listen(port, () => {
   console.log('Listening to port', port);
});