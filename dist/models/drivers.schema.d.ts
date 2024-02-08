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
export declare class Driver {
    user: User;
    mode: Mode;
    documents: Record<string, any>;
    statics: Record<string, any>;
    driver_criteria: Record<string, any>;
    bank_details: Record<string, any>;
    metadata: Record<string, any>;
    vehicle_details: Record<string, any>;
    note: string;
    admin_note: string;
    created_at: Date;
    updated_at: Date;
    address: Address[];
}
export type DriverSchemaType = mongoose.HydratedDocument<Driver>;
export declare const DriverSchema: mongoose.Schema<Driver, mongoose.Model<Driver, any, any, any, mongoose.Document<unknown, any, Driver> & Driver & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Driver, mongoose.Document<unknown, {}, mongoose.FlatRecord<Driver>> & mongoose.FlatRecord<Driver> & {
    _id: mongoose.Types.ObjectId;
}>;
