import {MongoError} from 'mongoose';
import {ArgumentsHost, ExceptionFilter, Catch} from "@nestjs/common";
import {Response } from 'express';


@Catch(MongoError)
export class MongoFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();
        if (exception.code === 11000) {
            response.status(400).json({ message: 'User already exists.' });
        } else {
            response.status(500).json({ message: 'Internal error.' });
        }
    }
}