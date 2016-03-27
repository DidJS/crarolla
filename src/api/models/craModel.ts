/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
var Schema = mongoose.Schema;

var craModel = new Schema({
    name: {type: String},
    month: {type: Number},
    year: {type: Number},
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
});

export = mongoose.model('Cra', craModel);