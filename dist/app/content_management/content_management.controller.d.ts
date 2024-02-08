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
import { ContentManagementService } from './content_management.service';
import { createUploadProfileDto } from './content_management.dto';
import { PagingQueryDto } from './content_management.dto';
export declare class ContentManagementController {
    private contentService;
    private readonly logger;
    constructor(contentService: ContentManagementService);
    createContentBanner(files: createUploadProfileDto): Promise<import("../../models/content_management").ContentManagement>;
    driverUploadProfile(id: string, files: createUploadProfileDto): Promise<string>;
    getAll(query: PagingQueryDto): Promise<import("../../models/content_management").ContentManagement[]>;
    getByIdCategory(id: string): Promise<import("../../models/content_management").ContentManagement | import("rxjs").Observable<import("../../models/content_management").ContentManagement>>;
    deleteContent(id: string): Promise<import("mongoose").Document<unknown, {}, import("../../models/content_management").ContentManagement> & import("../../models/content_management").ContentManagement & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
