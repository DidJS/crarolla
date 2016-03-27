/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import Client = require('./clientModel');
import Cra = require('./craModel');

var Schema = mongoose.Schema;

var userModel = new Schema({
    name: {
        firstname: {type: String},
        name: {type: String}
    },
    cras: [Cra.schema]
});

export = mongoose.model('User', userModel);