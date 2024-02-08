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
import { User } from './users.schema';
import mongoose from 'mongoose';
import { Mode } from './modes.schema';
export declare class Store {
    owner: User;
    mode: Mode;
    is_deleted?: boolean;
    name: string;
    email: string;
    contact_number: string;
    bank_details: Record<string, any>;
    description: string;
    avatar: string;
    website: string;
    address: Record<string, any>;
    opening_closing: Record<string, {
        open: Date;
        close: Date;
        status: 'open' | 'close';
    }>;
    delivery_radius: number;
    is_activated: boolean;
    updated_at: Date;
    created_at: Date;
    note: string;
    admin_note: string;
    best_selller: boolean;
    metadata: Record<string, any>;
    location: Record<string, any>;
}
export type storeSchemaType = mongoose.HydratedDocument<Store>;
export declare const storeSchema: mongoose.Schema<Store, mongoose.Model<Store, any, any, any, mongoose.Document<unknown, any, Store> & Store & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Store, mongoose.Document<unknown, {}, mongoose.FlatRecord<Store>> & mongoose.FlatRecord<Store> & {
    _id: mongoose.Types.ObjectId;
}>;
