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
import { Model, Types } from 'mongoose';
import { Mode } from '../../models/modes.schema';
import { createModeDto } from './modes.dto';
import { Observable } from 'rxjs';
import { pagingQueryType } from 'src/helpers/types/common';
export declare class ModesService {
    private modeModel;
    constructor(modeModel: Model<Mode>);
    build(model: createModeDto): Promise<import("mongoose").Document<unknown, {}, Mode> & Mode & {
        _id: Types.ObjectId;
    }>;
    createMode(model: createModeDto): Promise<Mode>;
    getAllMode(query: Required<pagingQueryType>): Promise<Mode[] | Observable<Mode[]>>;
    getById(id: string): Promise<Mode[]>;
    updateMode<T>(id: T | string, model: Partial<Mode>): Promise<Mode | Observable<Mode>>;
    DeleteMode(id: string): Promise<Mode | Observable<Mode | any>>;
    searchModes(query: string): Promise<Mode[]>;
}
