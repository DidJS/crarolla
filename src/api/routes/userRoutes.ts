/// <reference path="../../../typings/express/express.d.ts" />
/// <reference path="../../../typings/mongoose/mongoose.d.ts" />
import express = require('express');
import mongoose = require('mongoose');
import User = require('../models/userModel');
import Cra = require('../models/craModel');
import documents = require('../documents/documents');

var router = express.Router();

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
                (<documents.IRequest>req).user = user;
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
        res.json((<documents.IRequest>req).user);
    })
    .delete((req, res) => {
        (<documents.IRequest>req).user.remove((err) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(204).send('Removed');
            }
        })
    })
    .put((req, res) => {
        (<documents.IRequest>req).user.name.firstname = (<documents.IUser>req.body).name.firstname;
        (<documents.IRequest>req).user.name.name = (<documents.IUser>req.body).name.name;

        (<documents.IRequest>req).user.save(function(err) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json((<documents.IRequest>req).user);
            }
        });
    });

router.route('/:userId/cras')
    .get((req, res) => {
        res.json((<documents.IRequest>req).user.cras);
    })
    .post((req, res) => {
        (<documents.IRequest>req).user.cras.push(req.body);
        (<documents.IRequest>req).user.save((err, u) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(201).send(u);
            }
        })
    });

router.use('/:userId/cras/:craId', (req, res, next) => {
    var cras = (<documents.IRequest>req).user.cras.filter((cra) => {
        return cra._id == req.params.craId
    });

    if (!cras || cras.length === 0) {
        res.status(404).send('Cra not found');
    }
    else {
        (<documents.IRequest>req).cra = cras[0];
        next();
    }
});

router.route('/:userId/cras/:craId')
    .get((req, res) => {
        res.json((<documents.IRequest>req).cra);
    })
    .delete((req, res) => {
        var index = (<documents.IRequest>req).user.cras.indexOf((<documents.IRequest>req).cra);
        (<documents.IRequest>req).user.cras.splice(index, 1);

        (<documents.IRequest>req).user.save((err) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(204).send('cra removed');
            }
        })
    });

export = router;