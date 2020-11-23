import * as mongoose from 'mongoose';
import {roleEnum} from "../enums/role.enum";

export const UserSchema = new mongoose.Schema({
    email: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    roles: {
        type: [String], required: true, enum: Object.values(roleEnum)
    }
})

UserSchema.index({email: 1}, {unique: true})