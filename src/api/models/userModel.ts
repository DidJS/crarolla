/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import Cra = require('./craModel');
import documents = require('../contracts/contracts');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        firstname: {type: String, required: true},
        lastname: {type: String, required: true}
    },
    cras: [Cra]
});

export = mongoose.model<documents.IUser>('User', userSchema);