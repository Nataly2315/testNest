import * as mongoose from "mongoose"
import {statusEnum} from "../../enums/status.enum";

export const ProjectSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    responsible: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    status: {
        type: String,
        enum: Object.values(statusEnum),
        required: true,
    },
    dueDate: {
        type: Date,
    },
    createdAt: {
        default: Date.now(),
        type: Date,
    },
    updatedAt: {
        default: Date.now(),
        type: Date,
    },
    comment: {
        type: String,
    }
})