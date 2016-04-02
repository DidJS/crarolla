import * as express from 'express';
import User from './userModel';
import { IRequest, IUser} from '../contracts/contracts';

var getUsers = (req: IRequest, res: express.Response): void => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(users);
        }
    })
};

var createUser = (req: IRequest, res: express.Response): void => {
    let user = new User(req.body);
    user.save();

    res.status(201).send(user);
};

var attachUserToRequestObjectById = (req: IRequest, res: express.Response, next: express.NextFunction): void => {
    User.findById(req.params.userId, (err, user) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            if (user) {
                req.user = user;
                next();
            }
            else {
                res.send('No users found');
            }
        }
    })
};

var getUser = (req: IRequest, res: express.Response): void => {
    res.json(req.user);
};

var deleteUser = (req: IRequest, res: express.Response) => {
    req.user.remove((err) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(204).send('Removed');
        }
    })
};

var updateUser = (req: IRequest, res: express.Response) => {
    req.user.name.firstname = (<IUser>req.body).name.firstname;
    req.user.name.lastname = (<IUser>req.body).name.lastname;

    req.user.save(function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(req.user);
        }
    });
};

export {
    getUsers,
    createUser,
    attachUserToRequestObjectById,
    getUser,
    deleteUser,
    updateUser
}