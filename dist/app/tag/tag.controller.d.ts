import { TagService } from './tag.service';
import { PagingQueryDto, tagFilterDto, TagUpdateDto, createTagDto } from './tag.dto';
export declare class TagController {
    private tagService;
    private readonly logger;
    constructor(tagService: TagService);
    createUser(model: createTagDto): Promise<import("../../models/tag.schema").Tag>;
    getAllTag(id: string, query: PagingQueryDto): Promise<import("../../models/tag.schema").Tag[]>;
    softDelete(tagId: string): Promise<string>;
    updateUser(userId: string, model: TagUpdateDto): Promise<import("../../models/tag.schema").Tag | import("rxjs").Observable<import("../../models/tag.schema").Tag>>;
    searchCustomer(name: string): Promise<import("../../models/tag.schema").Tag[] | import("rxjs").Observable<import("../../models/tag.schema").Tag[]>>;
    filterCustomer(query: tagFilterDto): Promise<import("../../models/tag.schema").Tag[]>;
}
