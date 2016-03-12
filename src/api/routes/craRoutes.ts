/// <reference path="../../../typings/express/express.d.ts" />

import express = require('express')
import Cra = require('../models/craModel');

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
    //Cra.findById()
})

export = router;