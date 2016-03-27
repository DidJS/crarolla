/// <reference path="../../../typings/express/express.d.ts" />
/// <reference path="../../../typings/mongoose/mongoose.d.ts" />
import express = require('express');
import mongoose = require('mongoose');
var Schema = mongoose.Schema;

var craModel = new Schema({
    _id: {type: String},
    name: {type: String},
    month: {type: Number},
    year: {type: Number},
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
});

export interface ICra extends mongoose.Document {
    _id: String,
    name: String,
    month: Number,
    year: Number,
    clientId: Number
}

export interface IUser extends mongoose.Document {
    _id: String,
    name: {
        firstname: String,
        name: String
    },
    cras: [ICra]
}

export interface IRequest extends express.Request {
    user: IUser,
    cra: ICra
}