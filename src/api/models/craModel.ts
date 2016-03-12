/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
var Schema = mongoose.Schema;

var craModel = new Schema({
    name: {type: String},
    month: {type: Number},
    year: {type: Number}
});

export = mongoose.model('Cra', craModel);