import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    openId: {
        type: String,
        required: true,
    },
    chatId: {
        type: String,

    },
    email: {
        type: String
    }
});