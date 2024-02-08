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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { createCustomerDto, updateUserDto, deleteManyDto, PagingQueryDto, customerFilterDto, CustomerAddressUpdateDto } from './customers.dto';
import { CustomersService } from './customers.service';
export declare class CustomersController {
    private customerService;
    constructor(customerService: CustomersService);
    createCustomer(body: createCustomerDto): Promise<import("mongoose").Document<unknown, {}, import("../../models/customer.schema").Customer> & import("../../models/customer.schema").Customer & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllCustomer(id: string, query: PagingQueryDto): Promise<any[]>;
    searchCustomer(name: string): Promise<{
        [x: string]: any;
    }[]>;
    getById(id: string): Promise<{
        [x: string]: any;
    }>;
    updateCustomer(id: string, model: updateUserDto): Promise<string>;
    remove(id: string): Promise<string>;
    deleteManyCustomer(model: deleteManyDto): Promise<string>;
    filterCustomer(query: customerFilterDto): Promise<{
        [x: string]: any;
    }[]>;
    updateAddress(body: CustomerAddressUpdateDto, id: string): Promise<Partial<import("../../models/address.schema").Address>>;
}
