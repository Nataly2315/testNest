import {ConflictException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./interfaces/user.interface";
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import {AuthCredentialsDto} from "../auth/dto/auth-credentials.dto";


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const hash = await this.hashPassword(createUserDto.password);
        const createdUser = new this.userModel(Object.assign({}, createUserDto, {
            password: hash, roles: "user"
        }));

        return createdUser.save();
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.userModel.findOne({email}).exec();
    }

    async getUserById(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async validateUser(authCredentialDto: AuthCredentialsDto):Promise<User> {
        const {email, password} = authCredentialDto;
        const user = await this.getUserByEmail(email);
        if (user && (await  bcrypt.compare(password, user.password))){
            return user
        } else {
           return null
        }
    }

    async getAllUsers(): Promise<User[]>{
        return this.userModel.find().exec();
    }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    }
}
