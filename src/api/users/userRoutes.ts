/// <reference path="../../../typings/express/express.d.ts" />
/// <reference path="../../../typings/mongoose/mongoose.d.ts" />
import express = require('express');
import mongoose = require('mongoose');
import User = require('./userModel');
import Cra = require('../cras/craModel');
import documents = require('../contracts/contracts');

const router = express.Router();

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
                res.send('No users found');
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
        (<documents.IRequest>req).user.name.lastname = (<documents.IUser>req.body).name.lastname;

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
        Cra.find({userId: (<documents.IRequest>req).user._id}, (err, cras) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                if (cras) {
                    res.json(cras);
                }
                else {
                    res.status(404).send('No cras yet');
                }
            }
        })

    })
    .post((req, res) => {
        const cra = new Cra(req.body);

        cra.save((err) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(201).send(cra);
            }
        });
    });

router.use('/:userId/cras/:craId', (req, res, next) => {
    Cra.findById(req.params.craId)
    .populate('clientId')
    .exec((err, cra) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            if (cra) {
                (<documents.IRequest>req).cra = cra;
                next();
            }
            else {
                res.status(404).send('Cra not found');
            }
        }
    });
});

router.route('/:userId/cras/:craId')
    .get((req, res) => {
        res.json((<documents.IRequest>req).cra);
    })
    .put((req, res) => {
        (<documents.IRequest>req).cra.userId = (<documents.ICra>req.body).userId;
        (<documents.IRequest>req).cra.name = (<documents.ICra>req.body).name;
        (<documents.IRequest>req).cra.month = (<documents.ICra>req.body).month;
        (<documents.IRequest>req).cra.year = (<documents.ICra>req.body).year;
        (<documents.IRequest>req).cra.holidays = (<documents.ICra>req.body).holidays;
        (<documents.IRequest>req).cra.intercontract = (<documents.ICra>req.body).intercontract;
        (<documents.IRequest>req).cra.workingDays = (<documents.ICra>req.body).workingDays;
        (<documents.IRequest>req).cra.nonWorkingDays = (<documents.ICra>req.body).nonWorkingDays;
        (<documents.IRequest>req).cra.workingTimeReduction = (<documents.ICra>req.body).workingTimeReduction;
        (<documents.IRequest>req).cra.unpaidLeave = (<documents.ICra>req.body).unpaidLeave;
        (<documents.IRequest>req).cra.sickLeave = (<documents.ICra>req.body).sickLeave;
        (<documents.IRequest>req).cra.exceptionalLeave = (<documents.ICra>req.body).exceptionalLeave;
        (<documents.IRequest>req).cra.training = (<documents.ICra>req.body).training;
        (<documents.IRequest>req).cra.costs = (<documents.ICra>req.body).costs;
        (<documents.IRequest>req).cra.clientId = (<documents.ICra>req.body).clientId;

        (<documents.IRequest>req).cra.save((err, cra) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(cra);
            }
        });
    })
    .delete((req, res) => {
        (<documents.IRequest>req).cra.remove((err) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(204).send('Cra deleted successfully');
            }
        });
    });

export = router;