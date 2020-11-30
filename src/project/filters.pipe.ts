import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import * as mongoose from "mongoose";

@Injectable()
export class FiltersPipe implements PipeTransform {
    transform(query: any, metadata: ArgumentMetadata) {
        query.page = +query.page || 1;
        query.pageSize = +query.pageSize || 100;

        if (query.author){
            query.author = mongoose.Types.ObjectId(query.author);
        }
        if (query.responsible){
            query.responsible = mongoose.Types.ObjectId(query.responsible);
        }
       return query;
    }
}