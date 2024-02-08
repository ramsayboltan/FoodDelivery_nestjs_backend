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
import { HydratedDocument, Document } from 'mongoose';
export declare class Mode {
    name: string;
    display_name: string;
    description: string;
    metadata: Record<string, any>;
    is_activated: boolean;
    note: string;
    admin_note: string;
    is_deleted: boolean;
    created_at: Date;
    updated_at: Date;
}
export type ModeschemaType = HydratedDocument<Mode>;
export declare const ModeSchema: import("mongoose").Schema<Mode, import("mongoose").Model<Mode, any, any, any, Document<unknown, any, Mode> & Mode & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Mode, Document<unknown, {}, import("mongoose").FlatRecord<Mode>> & import("mongoose").FlatRecord<Mode> & {
    _id: import("mongoose").Types.ObjectId;
}>;
