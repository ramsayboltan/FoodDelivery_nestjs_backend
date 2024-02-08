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
import { Observable } from 'rxjs';
import { createTagDto, tagFilterDto } from './tag.dto';
import { Tag } from '@app/models/tag.schema';
import { JwtService } from '@nestjs/jwt';
export declare class TagService {
    private TagModel;
    private jwtService;
    constructor(TagModel: Model<Tag>, jwtService: JwtService);
    build(model: createTagDto): Promise<import("mongoose").Document<unknown, {}, Tag> & Tag & {
        _id: Types.ObjectId;
    }>;
    createtag(model: createTagDto): Promise<Tag>;
    getAlltag(id: string, queryParams: any): Promise<Tag[]>;
    softDelete(id: string): Promise<Tag | Observable<Tag | any>>;
    updateUser<T>(id: T | string, model: Partial<Tag>): Promise<Tag | Observable<Tag>>;
    searchTag(name: any): Promise<Tag[] | Observable<Tag[]>>;
    filterTag<T extends Partial<tagFilterDto>>(query: T): Promise<Tag[]>;
}
