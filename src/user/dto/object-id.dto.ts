import { IsMongoId } from 'class-validator';
import { ObjectID } from 'mongodb';

export class ObjectIdDTO {
    @IsMongoId()
    public id: ObjectID;
}