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
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { Driver } from '../../models/drivers.schema';
import { User } from '../../models/users.schema';
import { AddressService } from '../address/address.service';
import { Observable } from 'rxjs';
import { uploadProfileImage } from 'src/helpers/types/driver';
import { Address } from '@app/models/address.schema';
import { filterType } from '@app/helpers/types/driver';
export declare class DriversService {
    private driverModel;
    private userModel;
    private addressModel;
    private addressService;
    private userService;
    constructor(driverModel: Model<Driver>, userModel: Model<User>, addressModel: Model<Address>, addressService: AddressService, userService: UsersService);
    build(files: any, model: any): Promise<Driver>;
    createDriver(files: any, model: any): Promise<Driver | Observable<Driver>>;
    getAllDrivers(id: string, query: any): Promise<any[]>;
    getByIdDriver(id: string): Promise<Driver | Observable<Driver | null>>;
    updateDriver<T>(id: T, model: any): Promise<string>;
    deleteDriver<T>(id: T): Promise<string>;
    searchDriver(searchValue: string): Promise<Driver[] | Observable<Driver[]>>;
    uploadProfileImage<T extends string>(id: T, files: uploadProfileImage): Promise<string>;
    driverFilter<T extends Partial<filterType>>(query: T): Promise<Driver[]>;
}
