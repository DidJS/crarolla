/// <reference path="../../../typings/express/express.d.ts" />

import * as express from 'express';
import * as mongoose from 'mongoose';
import clientController from './clientController';

const router = express.Router();

router.route('/')
    .get(clientController.getClients)
    .post(clientController.createClient);

router.use('/:clientId', clientController.attachClientToRequestObjectById);

router.route('/:clientId')
    .get(clientController.getClient);

export default router;