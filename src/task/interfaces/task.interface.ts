import { Document } from 'mongoose';

export interface Task extends Document {
    readonly author: string;
    readonly title: string;
    readonly description: string;
    readonly executor: string;
    readonly status: string;
    readonly time: string;
    readonly comment: string;
    readonly project: string;
}