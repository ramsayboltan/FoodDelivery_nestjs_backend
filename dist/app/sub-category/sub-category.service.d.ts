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
import { Model } from 'mongoose';
import { subCategory } from '@app/models/subcategory.Schema';
import { SubCategoryDto } from './sub-category.dto';
import { Observable } from 'rxjs';
import { subInterface } from '../../helpers/interfaces/subinterface';
export declare class SubCategoryService {
    private subCategoryModel;
    constructor(subCategoryModel: Model<subCategory>);
    build(files: any, model: SubCategoryDto): Promise<import("mongoose").Document<unknown, {}, subCategory> & subCategory & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createSub(files: any, model: SubCategoryDto): Promise<subCategory>;
    getAllSub(queryParams: any): Promise<subCategory[]>;
    getByIdSub<T>(id: T): Promise<subCategory | Observable<subCategory | null>>;
    updateSub<T>(id: T | string, model: Partial<subInterface>): Promise<subCategory | Observable<any | subCategory>>;
    deleteSub<T>(id: T): Promise<string>;
    updateSC<T>(id: T | string, files: any, model: Partial<subInterface>): Promise<subCategory | Observable<any | subCategory>>;
}
