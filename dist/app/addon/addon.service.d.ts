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
import { Addon } from '../../models/addon.schema';
import { addonInterface } from '@app/helpers/interfaces/addon';
import { Observable } from 'rxjs';
import { addonFilterDto } from './addon.dto';
export declare class AddonService {
    private addonModel;
    constructor(addonModel: Model<Addon>);
    create<T extends addonInterface>(files: any, model: T): Promise<Addon | Observable<Addon | T>>;
    createMany<T extends addonInterface[]>(addonArr: T): Promise<any>;
    build(files: any, model: any): Promise<Addon>;
    createAddon(files: any, model: any): Promise<Addon | Observable<Addon>>;
    getAllAddon(id: string, queryParams: any): Promise<Addon[]>;
    getByIdAddon<T>(id: T): Promise<Addon | Observable<Addon | null>>;
    updateAddon<T>(id: T | string, model: Partial<addonInterface>): Promise<Addon | Observable<any | Addon>>;
    searchAddon(name: any): Promise<Addon[] | Observable<Addon[]>>;
    filterAddon<T extends Partial<addonFilterDto>>(query: T): Promise<Addon[]>;
    deleteAddon<T>(id: T): Promise<import("mongoose").Document<unknown, {}, Addon> & Addon & {
        _id: Types.ObjectId;
    }>;
}
