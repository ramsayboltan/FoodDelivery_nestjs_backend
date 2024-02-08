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
import mongoose from 'mongoose';
import { Mode } from './modes.schema';
export declare class Tag {
    mode: Mode;
    tagname: string;
    tittle: string;
    display_name: string;
    description: string;
    is_deleted: boolean;
    is_activated: boolean;
    created_at: Date;
    updated_at: Date;
}
export type TagSchemaType = HydratedDocument<Tag>;
export declare const TagSchema: mongoose.Schema<Tag, mongoose.Model<Tag, any, any, any, mongoose.Document<unknown, any, Tag> & Tag & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Tag, mongoose.Document<unknown, {}, mongoose.FlatRecord<Tag>> & mongoose.FlatRecord<Tag> & {
    _id: mongoose.Types.ObjectId;
}>;
