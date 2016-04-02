import * as express from 'express';
import { IRequest, IClient } from '../contracts/contracts';
import Client from './clientModel';

var getClients = (req: IRequest, res: express.Response): void => {
    Client.find({}, (err, clients) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(clients);
        }
    })
};

var createClient = (req: IRequest, res: express.Response): void => {
    const client = new Client(req.body);
    client.save((err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(result);
        }
    });
};

var attachClientToRequestObjectById = (req: IRequest, res: express.Response, next: express.NextFunction) => {
    Client.findById(req.params.clientId, (err, client) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            if (client) {
                req.client = client;
                next();
            }
            else {
                res.status(404).send('No client found');
            }
        }
    });
};

var getClient = (req: IRequest, res: express.Response) => {
    res.json(req.client);
};

export default {
    getClients,
    createClient,
    attachClientToRequestObjectById,
    getClient
}