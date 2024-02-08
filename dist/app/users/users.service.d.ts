/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model, Types } from 'mongoose';
import { User } from '../../models/users.schema';
import { createUserDto } from './users.dto';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { userInterface } from '../../helpers/interfaces/user.interface';
export declare class UsersService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    build(model: createUserDto): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    }>;
    createUser(model: createUserDto): Promise<User>;
    getAllUser(id: string, queryParams: any): Promise<User[]>;
    login(payload: any): Promise<Exclude<User, 'password'>>;
    getByIdUser(id: string): Promise<User | Observable<any | User>>;
    softDelete(id: string): Promise<User | Observable<User | any>>;
    updateUser<T>(id: T | string, model: Partial<userInterface>): Promise<User | Observable<User>>;
    uploadProfileImage(id: string, file: Express.Multer.File): Promise<string>;
}
