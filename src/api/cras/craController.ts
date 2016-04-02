import * as express from 'express';
import Cra from './craModel';
import { IRequest, ICra } from '../contracts/contracts';

var getCras = (req: IRequest, res: express.Response): void => {
    Cra.find({userId: (<IRequest>req).user._id}, (err, cras) => {
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
    });
};

var createCra = (req: IRequest, res: express.Response): void => {
    const cra = new Cra(req.body);

    cra.save((err) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(cra);
        }
    });
};

var attachCraToRequestObjectById = (req: IRequest, res: express.Response, next: express.NextFunction): void => {
    Cra.findById(req.params.craId)
    .populate('clientId')
    .exec((err, cra) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            if (cra) {
                req.cra = cra;
                next();
            }
            else {
                res.status(404).send('Cra not found');
            }
        }
    });
};

var getCra = (req: IRequest, res: express.Response): void => {
    res.json(req.cra);
};

var updateCra = (req: IRequest, res: express.Response): void => {
    req.cra.userId = (<ICra>req.body).userId;
    req.cra.name = (<ICra>req.body).name;
    req.cra.month = (<ICra>req.body).month;
    req.cra.year = (<ICra>req.body).year;
    req.cra.holidays = (<ICra>req.body).holidays;
    req.cra.intercontract = (<ICra>req.body).intercontract;
    req.cra.workingDays = (<ICra>req.body).workingDays;
    req.cra.nonWorkingDays = (<ICra>req.body).nonWorkingDays;
    req.cra.workingTimeReduction = (<ICra>req.body).workingTimeReduction;
    req.cra.unpaidLeave = (<ICra>req.body).unpaidLeave;
    req.cra.sickLeave = (<ICra>req.body).sickLeave;
    req.cra.exceptionalLeave = (<ICra>req.body).exceptionalLeave;
    req.cra.training = (<ICra>req.body).training;
    req.cra.costs = (<ICra>req.body).costs;
    req.cra.clientId = (<ICra>req.body).clientId;
    req.cra.comments = (<ICra>req.body).comments;

    req.cra.save((err, cra) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(cra);
        }
    });
};

var deleteCra = (req: IRequest, res: express.Response): void => {
    req.cra.remove((err) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(204).send('Cra deleted successfully');
        }
    });
};

export default {
    getCras,
    createCra,
    attachCraToRequestObjectById,
    getCra,
    updateCra,
    deleteCra
}