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
import { Menu } from '../../models/menu.schema';
import { createMenuDto } from './menu.dto';
import { menuinterface } from '@app/helpers/interfaces/menu';
import { Observable } from 'rxjs';
import { Store } from '../../models/store.schema';
import { StoreService } from '../store/store.service';
import { Types } from 'mongoose';
export declare class MenuService {
    private menuModel;
    private storeModel;
    private storeService;
    constructor(menuModel: Model<Menu>, storeModel: Model<Store>, storeService: StoreService);
    createMenu(model: createMenuDto): Promise<import("mongoose").Document<unknown, {}, Menu> & Menu & {
        _id: Types.ObjectId;
    }>;
    getAllMenu(id: string, queryParams: any): Promise<Menu[]>;
    getByIdMenu(id: string): Promise<Menu[]>;
    updateMenu<T>(id: T | string, model: Partial<menuinterface>): Promise<Menu | Observable<any | Menu>>;
    deleteMenu<T>(id: T): Promise<string>;
}
