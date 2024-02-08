/// <reference types="multer" />
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
import { Store } from '@app/models/store.schema';
import { Model, Types } from 'mongoose';
import { storeInterface } from '@app/helpers/interfaces/store';
import { Observable } from 'rxjs';
import { createStoreDto } from './store.dto';
export declare class StoreService {
    private storeModel;
    constructor(storeModel: Model<Store>);
    build(model: createStoreDto): Promise<import("mongoose").Document<unknown, {}, Store> & Store & {
        _id: Types.ObjectId;
    }>;
    createStore(model: any): Promise<any>;
    getAll(id: string, query: any): Promise<Store[]>;
    remove<T>(id: T): Promise<string>;
    getById(id: string): Promise<Store | Observable<any | Store>>;
    update<U, T extends Partial<storeInterface>>(id: U, model: T): Promise<Store | Observable<Store | any>>;
    uploadImage<T extends string, U extends Express.Multer.File>(id: T, file: U): Promise<string>;
}
