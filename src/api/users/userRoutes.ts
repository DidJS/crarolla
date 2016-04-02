/// <reference path="../../../typings/express/express.d.ts" />
/// <reference path="../../../typings/mongoose/mongoose.d.ts" />
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as userController from './userController';

const router: express.Router = express.Router();

router.route('/')
    .get(userController.getUsers)
    .post(userController.createUser);

router.use('/:userId', userController.attachUserToRequestObjectById);

router.route('/:userId')
    .get(userController.getUser)
    .delete(userController.deleteUser)
    .put(userController.updateUser);

export default router;