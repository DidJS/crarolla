/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import contracts = require('../contracts/contracts');
const Schema = mongoose.Schema;

const craSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {type: String},
    month: {type: Number},
    year: {type: Number},
    workingDays: {type: Number, default: 0},
    nonWorkingDays: {type: Number, default: 0},
    workingTimeReduction: {type: Number, default: 0},
    holidays: {type: Number, default: 0},
    unpaidLeave: {type: Number, default: 0},
    sickLeave: {type: Number, default: 0},
    exceptionalLeave: {type: Number, default: 0},
    intercontract: {type: Number, default: 0},
    training: {type: Number, default: 0},
    costs: {type: Number, default: 0},
    comments: {type: String, default: ""},
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    file: {data: Buffer, contentType: String}
});

export = mongoose.model<contracts.ICra>('Cra', craSchema);