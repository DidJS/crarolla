/// <reference path="../../../typings/express/express.d.ts" />
/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import express = require('express');
import mongoose = require('mongoose');
import User = require('../models/userModel');

var router = express.Router();

interface ICra {
    name: String,
    month: Number,
    year: Number,
    clientId: Number
}

interface IUser extends mongoose.Document {
    name: {
        firstname: String,
        name: String
    }
    cras: Array<ICra>
}

interface IRequest extends express.Request {
    user: IUser;
}

router.route('/')
    .get((req, res) => {
        User.find({}, (err, users) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(users);
            }
        })
    })
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
                (<IRequest>req).user = <IUser>user;
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
        res.json((<IRequest>req).user);
    })
    .delete((req, res) => {
        (<IRequest>req).user.remove((err) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(204).send('Removed');
            }
        })
    })
    .put((req, res) => {
        (<IRequest>req).user.name.firstname = (<IUser>req.body).name.firstname;
        (<IRequest>req).user.name.name = (<IUser>req.body).name.name;

        (<IRequest>req).user.save(function(err) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json((<IRequest>req).user);
            }
        });
    });

router.route('/:userId/cras')
    .get((req, res) => {
        res.json((<IRequest>req).user.cras);
    })
    .post((req, res) => {
        (<IRequest>req).user.cras.push(req.body);
        (<IRequest>req).user.save((err, u) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(201).send(u);
            }
        })
    })

export = router;