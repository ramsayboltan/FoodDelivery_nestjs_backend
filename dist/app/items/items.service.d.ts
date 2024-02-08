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
import { createItemDto } from './items.dto';
import { Item } from '../../models/item.schema';
import { Observable } from 'rxjs';
import { iteminterface } from '../../helpers/interfaces/item';
import { Addon } from '@app/models/addon.schema';
import { AddonService } from '../addon/addon.service';
import { itemDtoFilter } from './items.dto';
export declare class ItemsService {
    private itemModel;
    private addonModel;
    private addonService;
    constructor(itemModel: Model<Item>, addonModel: Model<Addon>, addonService: AddonService);
    build(files: any, model: createItemDto): Promise<import("mongoose").Document<unknown, {}, Item> & Item & {
        _id: Types.ObjectId;
    }>;
    createItem(files: any, model: any, addon_images: Express.Multer.File[]): Promise<Item | Observable<Item>>;
    getAll(id: string, query: any): Promise<Item[]>;
    getByIdMode(id: string): Promise<Item | Observable<any | Item>>;
    getByIdItem(id: string): Promise<Item | Observable<any | Item>>;
    updateItem<T>(id: T | string, model: Partial<iteminterface>): Promise<Item | Observable<any | Item>>;
    deleteItem(id: string): Promise<Item | Observable<any | Item>>;
    searchItem(name: any): Promise<Item[] | Observable<Item[]>>;
    filterItem<T extends Partial<itemDtoFilter>>(query: T): Promise<Item[]>;
    uploadProfileImage<T extends string, U extends Express.Multer.File>(id: T, file: U): Promise<string>;
}
