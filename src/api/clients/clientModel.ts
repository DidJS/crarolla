/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import * as mongoose from 'mongoose';
import { IClient } from '../contracts/contracts';

import Schema = mongoose.Schema;

const clientModel = new Schema({
    name: {type: String, required: true}
});

export default mongoose.model<IClient>('Client', clientModel);