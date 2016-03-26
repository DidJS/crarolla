/// <reference path="../../../typings/express/express.d.ts" />

import express = require('express');
import User = require('../models/userModel');

var router = express.Router();

interface IRequest extends express.Request {
    user: any;
}

router.route('/')
    .post((req, res) => {
        const user = new User(req.body);
        user.save();

        res.status(201).send(user);
    })

router.use('/:userId', (req, res, next) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            if (user) {
                (<IRequest>req).user = user;
                next();
            }
            else {
                res.status(404).send('No users found');
            }
        }
    })
});

router.route('/:userId')
    .get((req, res) => {
        res.json((<IRequest>req).user.name);
    });

router.route('/:userId/cras')
    .get((req, res) => {
        res.json((<IRequest>req).user.cras);
    })

export = router;