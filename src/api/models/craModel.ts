/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const craSchema = new Schema({
    name: {type: String},
    month: {type: Number},
    year: {type: Number},
    workingDays: {type: Number},
    nonWorkingDays: {type: Number},
    workingTimeReduction: {type: Number},
    holidays: {type: Number},
    unpaidLeave: {type: Number},
    sickLeave: {type: Number},
    exceptionalLeave: {type: Number},
    intercontract: {type: Number},
    training: {type: Number},
    costs: {type: Number},
    comments: {type: String},
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    file: {data: Buffer, contentType: String}
});

export = craSchema;