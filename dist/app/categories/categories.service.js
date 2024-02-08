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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const category_schema_1 = require("../../models/category.schema");
const string_1 = require("../../utils/string");
const moment = require("moment");
let CategoriesService = class CategoriesService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async build(files, model) {
        const { fullname, mode, description, note, admin_note, is_activated } = model;
        const [avatar] = files.avatar;
        const avatarFilename = avatar.filename;
        const category = await new this.categoryModel({
            fullname,
            description,
            avatar: avatarFilename,
            note,
            mode,
            admin_note,
            is_activated,
        }).save();
        return category;
    }
    async createCategory(files, model) {
        const category = await this.build(files, model);
        return category;
    }
    async getAllCategory(id, queryParams) {
        let { page_no = '1', page_size = '50' } = queryParams;
        page_no = Number(page_no);
        page_size = Number(page_size);
        const skip = (page_no - 1) * page_size;
        const category = await this.categoryModel.aggregate([
            {
                $match: {
                    mode: new mongoose_1.Types.ObjectId(id),
                },
            },
            {
                $match: {
                    is_deleted: false,
                },
            },
            {
                $skip: skip,
            },
            {
                $limit: page_size,
            },
        ]);
        return category;
    }
    async getByIdCategory(id) {
        const category = await this.categoryModel.findById(id);
        return category;
    }
    async updateCategory(id, model) {
        const category = await this.categoryModel.findByIdAndUpdate({ _id: id });
        if (!category) {
            throw new common_1.HttpException('category not found', common_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, string_1.isValidString)(model.fullname)) {
            category.fullname = model.fullname;
        }
        if ((0, string_1.isValidString)(model.description)) {
            category.description = model.description;
        }
        if (model.is_activated) {
            category.is_activated = model.is_activated;
        }
        if ((0, string_1.isValidString)(model.note)) {
            category.note = model.note;
        }
        if ((0, string_1.isValidString)(model.admin_note)) {
            category.admin_note = model.admin_note;
        }
        await category.save();
        return category;
    }
    async uploadProfileImage(id, file) {
        const category = await this.categoryModel.findById({ _id: id });
        if (!category) {
            throw new common_1.HttpException(`category not found`, common_1.HttpStatus.BAD_REQUEST);
        }
        category.avatar = file.filename;
        await category.save();
        return 'image upload';
    }
    async categoryDelete(id) {
        const category = await this.categoryModel.findById({ _id: id });
        if (!category) {
            throw new common_1.HttpException('category not found', common_1.HttpStatus.BAD_REQUEST);
        }
        category.is_deleted = true;
        await category.save();
        return 'category remove';
    }
    async searchCategory(name) {
        const customer = await this.categoryModel.aggregate([
            {
                $match: {
                    is_deleted: false,
                    fullname: {
                        $regex: `.*${name}.*`,
                        $options: 'i',
                    },
                },
            },
        ]);
        return customer;
    }
    async filterCategory(query) {
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
                    fullname: query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
                },
            };
            pipeline.push({ ...sorting });
        }
        const data = await this.categoryModel.aggregate(pipeline);
        return data;
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(category_schema_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map