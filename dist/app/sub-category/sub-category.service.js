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
exports.SubCategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const subcategory_Schema_1 = require("../../models/subcategory.Schema");
const string_1 = require("../../utils/string");
let SubCategoryService = class SubCategoryService {
    constructor(subCategoryModel) {
        this.subCategoryModel = subCategoryModel;
    }
    async build(files, model) {
        const { name, mode, description, is_activated, note, admin_note } = model;
        const [image] = files.image;
        const imageFilename = image.filename;
        const subCategory = await new this.subCategoryModel({
            name,
            description,
            note,
            mode,
            admin_note,
            is_activated,
            image: imageFilename,
        }).save();
        return subCategory;
    }
    async createSub(files, model) {
        const sub = await this.build(files, model);
        return sub;
    }
    async getAllSub(queryParams) {
        let { page_no = '1', page_size = '50' } = queryParams;
        page_no = Number(page_no);
        page_size = Number(page_size);
        const skip = (page_no - 1) * page_size;
        const sub = await this.subCategoryModel.aggregate([
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
        return sub;
    }
    async getByIdSub(id) {
        const sub = await this.subCategoryModel.findById(id);
        return sub;
    }
    async updateSub(id, model) {
        const sub = await this.subCategoryModel.findByIdAndUpdate({ _id: id });
        if (!sub) {
            throw new common_1.HttpException('subcategory not found', common_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, string_1.isValidString)(model.name)) {
            sub.name = model.name;
        }
        if ((0, string_1.isValidString)(model.description)) {
            sub.description = model.description;
        }
        if ((0, string_1.isValidString)(model.note)) {
            sub.note = model.note;
        }
        if ((0, string_1.isValidString)(model.admin_note)) {
            sub.admin_note = model.admin_note;
        }
        await sub.save();
        return sub;
    }
    async deleteSub(id) {
        const sub = await this.subCategoryModel.findByIdAndUpdate({ _id: id }, {
            $set: {
                is_deleted: true,
            },
        });
        if (!sub) {
            throw new common_1.HttpException(`subCategory not found`, common_1.HttpStatus.BAD_REQUEST);
        }
        return 'subCategory deleted';
    }
    async updateSC(id, files, model) {
        const sub = await this.subCategoryModel.findByIdAndUpdate({ _id: id });
        if (!sub) {
            throw new common_1.HttpException('subcategory not found', common_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, string_1.isValidString)(model.name)) {
            sub.name = model.name;
        }
        if ((0, string_1.isValidString)(model.description)) {
            sub.description = model.description;
        }
        if ((0, string_1.isValidString)(model.note)) {
            sub.note = model.note;
        }
        if ((0, string_1.isValidString)(model.admin_note)) {
            sub.admin_note = model.admin_note;
        }
        if (files && files.image) {
            sub.image = files.image[0].filename;
        }
        await sub.save();
        return sub;
    }
};
exports.SubCategoryService = SubCategoryService;
exports.SubCategoryService = SubCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(subcategory_Schema_1.subCategory.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], SubCategoryService);
//# sourceMappingURL=sub-category.service.js.map