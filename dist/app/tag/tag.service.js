"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const string_1 = require("../../utils/string");
const tag_schema_1 = require("../../models/tag.schema");
const jwt_1 = require("@nestjs/jwt");
const moment = require("moment");
let TagService = class TagService {
    constructor(TagModel, jwtService) {
        this.TagModel = TagModel;
        this.jwtService = jwtService;
    }
    async build(model) {
        const { tagname, tittle, is_activated, mode, display_name, description } = model;
        const tag = new this.TagModel({
            tagname,
            mode,
            tittle,
            display_name,
            description,
            is_activated,
        }).save();
        return tag;
    }
    async createtag(model) {
        return await this.build(model);
    }
    async getAlltag(id, queryParams) {
        let { page_no = '1', page_size = '50' } = queryParams;
        page_no = Number(page_no);
        page_size = Number(page_size);
        const skip = (page_no - 1) * page_size;
        const all_users = await this.TagModel.aggregate([
            {
                $match: {
                    $and: [
                        { mode: new mongoose_1.Types.ObjectId(id) },
                        {
                            is_deleted: false,
                        },
                    ],
                },
            },
            {
                $skip: skip,
            },
            {
                $limit: page_size,
            },
        ]);
        return all_users;
    }
    async softDelete(id) {
        const tag = await this.TagModel.findByIdAndUpdate({ _id: id }, {
            $set: {
                is_deleted: true,
            },
        });
        return tag;
    }
    async updateUser(id, model) {
        const tag = await this.TagModel.findById({ _id: id }, {
            password: 0,
            token: 0,
            device_token: 0,
        });
        if (!tag) {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, string_1.isValidString)(model.tagname !== 'string' && model.tagname !== undefined && model.tagname !== '' && model.tagname)) {
            tag.tagname = model.tagname;
        }
        if ((0, string_1.isValidString)(model.tittle !== 'string' && model.tittle !== undefined && model.tittle !== '' && model.tittle)) {
            tag.tittle = model.tittle;
        }
        if ((0, string_1.isValidString)(model.display_name !== 'string' &&
            model.display_name !== undefined &&
            model.display_name !== '' &&
            model.display_name)) {
            tag.display_name = model.display_name;
        }
        if ((0, string_1.isValidString)(model.description !== 'string' &&
            model.description !== undefined &&
            model.description !== '' &&
            model.description)) {
            tag.description = model.description;
        }
        if (model.updated_at) {
            tag.updated_at = model.updated_at;
        }
        tag.updated_at = new Date();
        await tag.save();
        return tag;
    }
    async searchTag(name) {
        const customer = await this.TagModel.aggregate([
            {
                $match: {
                    is_deleted: false,
                    tagname: {
                        $regex: `.*${name}.*`,
                        $options: 'i',
                    },
                },
            },
        ]);
        return customer;
    }
    async filterTag(query) {
        const is_active = JSON.parse(query.is_active);
        const is_inactive = JSON.parse(query.is_inactive);
        const pipeline = [
            {
                $match: {
                    is_deleted: false,
                },
            },
        ];
        const matchQuery = {
            $match: { $or: [] },
        };
        if (is_active) {
            matchQuery['$match']['$or'].push({ is_activated: true });
        }
        if (is_inactive) {
            matchQuery['$match']['$or'].push({ is_activated: false });
        }
        if (is_active || is_inactive) {
            pipeline.push(matchQuery);
        }
        if (query.date_from && query.date_to) {
            const start_date = moment(query.date_from).startOf('days').toISOString();
            const end_date = moment(query.date_to).endOf('days').toISOString();
            const date_match = {
                $match: {
                    $and: [{ created_at: { $gte: new Date(start_date) } }, { created_at: { $lte: new Date(end_date) } }],
                },
            };
            pipeline.push(date_match);
        }
        if (query.sort_order) {
            const sorting = {
                $sort: {
                    tagname: query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
                },
            };
            pipeline.push({ ...sorting });
        }
        const data = await this.TagModel.aggregate(pipeline);
        return data;
    }
};
exports.TagService = TagService;
exports.TagService = TagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(tag_schema_1.Tag.name)),
    __metadata("design:paramtypes", [mongoose_1.Model, jwt_1.JwtService])
], TagService);
//# sourceMappingURL=tag.service.js.map