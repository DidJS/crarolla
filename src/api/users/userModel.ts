/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

import * as mongoose from 'mongoose';
import { IUser } from '../contracts/contracts';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        firstname: {type: String, required: true},
        lastname: {type: String, required: true}
    }
});

export default mongoose.model<IUser>('User', userSchema);