/// <reference path="../../../typings/express/express.d.ts" />
/// <reference path="../../../typings/mongoose/mongoose.d.ts" />
import * as express from 'express';
import * as mongoose from 'mongoose';

interface IClient extends mongoose.Document {
    _id: String,
    name: String
}

interface ICra extends mongoose.Document {
    _id: String,
    userId: Number,
    name: String,
    month: Number,
    year: Number,
    workingDays: Number,
    nonWorkingDays: Number,
    workingTimeReduction: Number,
    holidays: Number,
    unpaidLeave: Number,
    sickLeave: Number,
    exceptionalLeave: Number,
    intercontract: Number,
    training: Number,
    costs: Number,
    comments: String,
    clientId: Number
}

interface IUser extends mongoose.Document {
    _id: String,
    name: {
        firstname: String,
        lastname: String
    }
}

interface IRequest extends express.Request {
    user: IUser,
    cra: ICra,
    client: IClient
}

export {ICra, IUser, IRequest, IClient}