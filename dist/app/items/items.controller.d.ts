/// <reference types="multer" />
import { createItemDto, PagingQueryDto, itemDtoFilter, ItemUpdatedDto } from './items.dto';
import { ItemsService } from './items.service';
import { documentsFileType } from '@app/helpers/types/item';
export declare class ItemsController {
    private itemService;
    private readonly logger;
    constructor(itemService: ItemsService);
    createItem(files: documentsFileType, body: createItemDto): Promise<import("../../models/item.schema").Item | import("rxjs").Observable<import("../../models/item.schema").Item>>;
    getAll(id: string, query: PagingQueryDto): Promise<import("../../models/item.schema").Item[]>;
    getByIdItem(id: string): Promise<import("rxjs").Observable<any> | import("../../models/item.schema").Item>;
    updateItem(id: string, model: ItemUpdatedDto): Promise<import("rxjs").Observable<any> | import("../../models/item.schema").Item>;
    deleteItem(id: string): Promise<string>;
    searchCustomer(name: string): Promise<import("../../models/item.schema").Item[] | import("rxjs").Observable<import("../../models/item.schema").Item[]>>;
    filterCustomer(query: itemDtoFilter): Promise<{
        [x: string]: any;
    }[]>;
    uploadProfileImage(id: string, file: Express.Multer.File): Promise<string>;
    getByIdMode(id: string): Promise<import("rxjs").Observable<any> | import("../../models/item.schema").Item>;
}
