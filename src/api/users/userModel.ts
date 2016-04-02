/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import documents = require('../contracts/contracts');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        firstname: {type: String, required: true},
        lastname: {type: String, required: true}
    }
});

export = mongoose.model<documents.IUser>('User', userSchema);