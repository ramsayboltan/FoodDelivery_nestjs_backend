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
import { Schema as MongoSchema } from 'mongoose';
import { Item } from './item.schema';
import mongoose from 'mongoose';
import { Mode } from './modes.schema';
export declare class Addon {
    mode: Mode;
    itemId: Item;
    addon: Record<string, any>;
    addon_type: Record<string, any>;
    image: string;
    is_deleted: boolean;
    is_activated: boolean;
    created_at: Date;
    updated_at: Date;
}
export declare const addonSchema: MongoSchema<Addon, mongoose.Model<Addon, any, any, any, mongoose.Document<unknown, any, Addon> & Addon & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Addon, mongoose.Document<unknown, {}, mongoose.FlatRecord<Addon>> & mongoose.FlatRecord<Addon> & {
    _id: mongoose.Types.ObjectId;
}>;
