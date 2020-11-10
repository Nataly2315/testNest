import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./interfaces/user.interface";
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    }

    async createUser(createUserDto: CreateUserDto, roles: Array<string>): Promise<User> {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(createUserDto.password, salt);

        const createdUser = new this.userModel(Object.assign({}, createUserDto, {
            password: hash, roles
        }));

        return createdUser.save();

    }

    async findUser(email:string, password:string): Promise<User> {
        return await this.userModel.findOne({email, password}).exec();
    }
}
