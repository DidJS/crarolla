/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const craSchema = new Schema({
    name: {type: String},
    month: {type: Number},
    year: {type: Number},
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
});

export = craSchema;