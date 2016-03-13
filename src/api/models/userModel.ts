/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userModel = new Schema({
    name: {
        firstname: {type: String},
        name: {type: String}
    },
    cras: [{
        name: {type: String},
        month: {type: Number},
        year: {type: Number}
    }]
});

export = mongoose.model('User', userModel);