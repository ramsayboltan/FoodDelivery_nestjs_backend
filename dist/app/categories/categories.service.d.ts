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
import { Model, Types } from 'mongoose';
import { Category } from '../../models/category.schema';
import { createCategoryDto, categoryDtoFilter } from './categories.dto';
import { categoryinterface } from '../../helpers/interfaces/catagory';
import { Observable } from 'rxjs';
export declare class CategoriesService {
    private categoryModel;
    constructor(categoryModel: Model<Category>);
    build(files: any, model: createCategoryDto): Promise<import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: Types.ObjectId;
    }>;
    createCategory(files: any, model: createCategoryDto): Promise<Category>;
    getAllCategory(id: string, queryParams: any): Promise<Category[]>;
    getByIdCategory<T>(id: T): Promise<Category | Observable<Category | null>>;
    updateCategory<T>(id: T | string, model: Partial<categoryinterface>): Promise<Category | Observable<any | Category>>;
    uploadProfileImage<T extends string, U extends Express.Multer.File>(id: T, file: U): Promise<string>;
    categoryDelete<T>(id: T): Promise<string>;
    searchCategory(name: any): Promise<Category[] | Observable<Category[]>>;
    filterCategory<T extends Partial<categoryDtoFilter>>(query: T): Promise<Category[]>;
}
