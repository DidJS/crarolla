/// <reference path="../../../typings/express/express.d.ts" />
/// <reference path="../../../typings/mongoose/mongoose.d.ts" />
import * as express from 'express';
import craController from './craController';

const router: express.Router = express.Router();

router.route('/')
    .get(craController.getCras)
    .post(craController.createCra);

router.use('/:craId', craController.attachCraToRequestObjectById);

router.route('/:craId')
    .get(craController.getCra)
    .put(craController.updateCra)
    .delete(craController.deleteCra);

 export default router;