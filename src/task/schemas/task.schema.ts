import * as mongoose from 'mongoose';

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
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
    ,
    time: {
        type: String,
    },
    comment: {
        type: String,
    }
});