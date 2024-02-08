/// <reference types="multer" />
import { UsersService } from './users.service';
import { createUserDto, PagingQueryDto, LoginModel, UserUpdateDto } from './users.dto';
export declare class UsersController {
    private userService;
    private readonly logger;
    constructor(userService: UsersService);
    createUser(model: createUserDto): Promise<import("../../models/users.schema").User>;
    getAllUser(id: string, query: PagingQueryDto): Promise<import("../../models/users.schema").User[]>;
    login(model: LoginModel): Promise<import("../../models/users.schema").User>;
    getById(userId: string): Promise<import("../../models/users.schema").User | import("rxjs").Observable<any>>;
    softDelete(userId: string): Promise<string>;
    updateUser(userId: string, model: UserUpdateDto): Promise<import("../../models/users.schema").User | import("rxjs").Observable<import("../../models/users.schema").User>>;
    uploadProfileImage(id: string, file: Express.Multer.File): Promise<string>;
}
