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
import { Menu } from './menu.schema';
import { Category } from './category.schema';
import { Addon } from './addon.schema';
import { Mode } from './modes.schema';
export declare class Item {
    menu: Menu;
    category: Category;
    mode: Mode;
    itemName: string;
    itemDsc: string;
    metadata: Record<string, any>;
    vegetarian_type: string;
    is_activated: boolean;
    is_deleted: boolean;
    avatar: string;
    quantity: string;
    price: string;
    status: string;
    note: string;
    admin_note: string;
    created_at: Date;
    updated_at: Date;
    addon: Addon[];
}
export type ItemSchemaType = mongoose.HydratedDocument<Item>;
export declare const ItemSchema: mongoose.Schema<Item, mongoose.Model<Item, any, any, any, mongoose.Document<unknown, any, Item> & Item & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Item, mongoose.Document<unknown, {}, mongoose.FlatRecord<Item>> & mongoose.FlatRecord<Item> & {
    _id: mongoose.Types.ObjectId;
}>;
