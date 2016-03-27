/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import Schema = mongoose.Schema;

var clientModel = new Schema({
    name: {type: String, required: true}
});

export = mongoose.model('Client', clientModel);