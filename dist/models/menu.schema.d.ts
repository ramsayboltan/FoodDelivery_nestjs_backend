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
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Store } from './store.schema';
import { Mode } from './modes.schema';
export declare class Menu {
    store: Store;
    mode: Mode;
    name: string;
    description: string;
    note: string;
    is_activated: boolean;
    is_deleted: boolean;
    admin_note: string;
    created_at: Date;
    updated_at: Date;
}
export type MenuSchemaType = HydratedDocument<Menu>;
export declare const MenuScehma: mongoose.Schema<Menu, mongoose.Model<Menu, any, any, any, mongoose.Document<unknown, any, Menu> & Menu & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Menu, mongoose.Document<unknown, {}, mongoose.FlatRecord<Menu>> & mongoose.FlatRecord<Menu> & {
    _id: mongoose.Types.ObjectId;
}>;
