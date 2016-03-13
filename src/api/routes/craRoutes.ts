/// <reference path="../../../typings/express/express.d.ts" />

import express = require('express')
import Cra = require('../models/craModel');

interface IRequest extends express.Request {
    cra: any,
    cras: any
}

var router: express.Router = express.Router();

router.route('/')
    .post(function(req, res) {
        const cra = new Cra(req.body);

        cra.save();
        res.status(201).send(cra);
    })
    .get(function(req, res) {
        var query = {};

        Cra.find(query, function(err, cras) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(cras);
            }
        });
    });

router.use('/:craId', function(req, res, next) {
    Cra.findById(req.params.craId, function(err, cra) {
       if (err) {
           res.status(500).send(err);
       }
       else {
           if (cra) {
               (<IRequest>req).cra = cra;
               next();
           }
           else {
               res.status(404).send('aucun cra');
           }
       }
    });
});

router.route('/:cra')
    .get(function(req, res) {
        res.json((<IRequest>req).cra);
    })
    .delete(function(req, res) {
        (<IRequest>req).cra.remove(function(err: any) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(204).send('cra supprimé');
            }
        })
    });

export = router;