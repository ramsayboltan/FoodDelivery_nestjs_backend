/// <reference types="multer" />
import { createCategoryDto, PagingQueryDto, categoryDtoFilter, updateCategoryDto } from './categories.dto';
import { CategoriesService } from './categories.service';
import { documentesFileType } from '@app/helpers/types/category';
export declare class CategoriesController {
    private categoryService;
    private readonly logger;
    constructor(categoryService: CategoriesService);
    createCategory(files: documentesFileType, body: createCategoryDto): Promise<import("../../models/category.schema").Category>;
    getAllCategory(id: string, query: PagingQueryDto): Promise<import("../../models/category.schema").Category[]>;
    getByIdCategory(id: string): Promise<import("../../models/category.schema").Category | import("rxjs").Observable<import("../../models/category.schema").Category>>;
    updateCategory(id: string, model: updateCategoryDto): Promise<import("rxjs").Observable<any> | import("../../models/category.schema").Category>;
    uploadProfileImage(id: string, file: Express.Multer.File): Promise<string>;
    deleteCategory(id: string): Promise<string>;
    searchCustomer(name: string): Promise<import("../../models/category.schema").Category[] | import("rxjs").Observable<import("../../models/category.schema").Category[]>>;
    filterCustomer(query: categoryDtoFilter): Promise<import("../../models/category.schema").Category[]>;
}
