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
import { UsersService } from '../users/users.service';
import { Model, Types } from 'mongoose';
import { Customer } from '../../models/customer.schema';
import { User } from '../../models/users.schema';
import { Observable } from 'rxjs';
import { AddressService } from '../address/address.service';
import { addressInterface } from '@app/helpers/interfaces/address';
import { customerFilterType } from '@app/helpers/types/customer';
import { Address } from '@app/models/address.schema';
export declare class CustomersService {
    private customerModel;
    private addressModel;
    private userModel;
    private addressService;
    private userService;
    constructor(customerModel: Model<Customer>, addressModel: Model<Address>, userModel: Model<User>, addressService: AddressService, userService: UsersService);
    createCustomer(model: any): Promise<import("mongoose").Document<unknown, {}, Customer> & Customer & {
        _id: Types.ObjectId;
    }>;
    getAllCustomer(id: string, query: any): Promise<any[]>;
    getById(id: string): Promise<Customer | Observable<Customer | null>>;
    updateCustomer<T>(id: T, model: any): Promise<string>;
    remove<T>(id: T): Promise<string>;
    removeManyCustomer<T extends string[]>(customer_ids: T): Promise<string>;
    searchCustomer(name: any): Promise<Customer[] | Observable<Customer[]>>;
    filterCustomer<T extends Partial<customerFilterType>>(query: T): Promise<Customer[]>;
    updateAddress(id: string, model: Partial<addressInterface>): Promise<Partial<Address>>;
}
