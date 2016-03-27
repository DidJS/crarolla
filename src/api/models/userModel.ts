/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import Client = require('./clientModel');
import Cra = require('./craModel');
import documents = require('../documents/documents');

var Schema = mongoose.Schema;

var userModel = new Schema({
    name: {
        firstname: {type: String},
        name: {type: String}
    },
    cras: [Cra]
});

export = mongoose.model<documents.IUser>('User', userModel);