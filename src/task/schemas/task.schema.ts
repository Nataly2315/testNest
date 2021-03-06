import * as mongoose from 'mongoose';
import {statusEnum} from "../../enums/status.enum";

export const TaskSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    executor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    status: {
        type: String,
        enum: Object.values(statusEnum),
        required: true,
    },
    createdAt: {
        default: Date.now(),
        type: Date,
    },
    comment: {
        type: String,
    },
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    }
});