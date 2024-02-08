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
import * as mongoose from 'mongoose';
import { User } from './users.schema';
import { Address } from './address.schema';
import { Mode } from './modes.schema';
export declare class Customer {
    user: User;
    mode: Mode;
    note: string;
    admin_note: string;
    created_at: Date;
    updated_at: Date;
    address: Address[];
}
export type CustomerSchemaType = mongoose.HydratedDocument<Customer>;
export declare const customerSchema: mongoose.Schema<Customer, mongoose.Model<Customer, any, any, any, mongoose.Document<unknown, any, Customer> & Customer & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Customer, mongoose.Document<unknown, {}, mongoose.FlatRecord<Customer>> & mongoose.FlatRecord<Customer> & {
    _id: mongoose.Types.ObjectId;
}>;
