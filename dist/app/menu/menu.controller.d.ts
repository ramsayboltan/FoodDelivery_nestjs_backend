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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { createMenuDto, updateMenuDto, PagingQueryDto } from './menu.dto';
import { MenuService } from './menu.service';
export declare class MenuController {
    private menuService;
    private readonly logger;
    constructor(menuService: MenuService);
    createMenu(body: createMenuDto): Promise<import("mongoose").Document<unknown, {}, import("../../models/menu.schema").Menu> & import("../../models/menu.schema").Menu & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllMenu(id: string, query: PagingQueryDto): Promise<import("../../models/menu.schema").Menu[]>;
    getByIdMenu(id: string): Promise<import("../../models/menu.schema").Menu[]>;
    updateMenu(id: string, model: updateMenuDto): Promise<import("rxjs").Observable<any> | import("../../models/menu.schema").Menu>;
    deleteMenu(id: string): Promise<string>;
}
