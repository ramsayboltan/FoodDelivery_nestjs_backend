import { SubCategoryDto, PagingQueryDto, updateSubCategory } from './sub-category.dto';
import { SubCategoryService } from './sub-category.service';
import { documentesSubType } from '@app/helpers/types/subCategory';
export declare class SubCategoryController {
    private subCategoryService;
    private readonly logger;
    constructor(subCategoryService: SubCategoryService);
    createSub(files: documentesSubType, body: SubCategoryDto): Promise<import("../../models/subcategory.Schema").subCategory>;
    getAllSub(query: PagingQueryDto): Promise<import("../../models/subcategory.Schema").subCategory[]>;
    getByIdCategory(id: string): Promise<import("../../models/subcategory.Schema").subCategory | import("rxjs").Observable<import("../../models/subcategory.Schema").subCategory>>;
    updateSub(id: string, model: updateSubCategory): Promise<import("rxjs").Observable<any> | import("../../models/subcategory.Schema").subCategory>;
    updateSC(id: string, files: documentesSubType, model: updateSubCategory): Promise<import("rxjs").Observable<any> | import("../../models/subcategory.Schema").subCategory>;
    deleteSub(id: string): Promise<string>;
}
