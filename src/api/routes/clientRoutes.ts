/// <reference path="../../../typings/express/express.d.ts" />

import express = require('express');
import Client = require('../models/clientModel');

var router = express.Router();

interface IRequest extends express.Request {
    client: any;
}

router.route('/')
    .get((req, res) => {
        Client.find({}, (err, clients) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(clients);
            }
        })
    })
    .post((req, res) => {
       var client = new Client(req.body);
       client.save((err, result) => {
           if (err) {
               res.status(500).send(err);
           }
           else {
               res.status(201).send(result);
           }
       });
    });

router.use('/:clientId', (req, res, next) => {
    Client.findById(req.params.clientId, (err, client) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            if (!client) {
                res.status(404).send('No client found');
            }
            else {
                (<IRequest>req).client = client;
                next();
            }
        }
    })
});

router.route('/:clientId')
    .get((req, res) => {
        res.json((<IRequest>req).client);
    })

export = router;