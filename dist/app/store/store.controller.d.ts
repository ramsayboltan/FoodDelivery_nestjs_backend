/// <reference types="multer" />
import { Store } from 'src/models/store.schema';
import { Observable } from 'rxjs';
import { StoreService } from './store.service';
import { createStoreDto, PagingQueryDto, updateStoreDto } from './store.dto';
export declare class StoreController {
    private storeService;
    constructor(storeService: StoreService);
    create(body: createStoreDto): Promise<Store | Observable<Store>>;
    getAll(id: string, query: PagingQueryDto): Promise<Store[]>;
    deleteStore(id: string): Promise<string>;
    getById(id: string): Promise<Observable<any> | Store>;
    update(id: string, model: updateStoreDto): Promise<Store | Observable<Store>>;
    uploadImage(id: string, file: Express.Multer.File): Promise<string>;
}
