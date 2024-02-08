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
exports.ContentManagementService = void 0;
const content_management_1 = require("../../models/content_management");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ContentManagementService = class ContentManagementService {
    constructor(contentManagemenet) {
        this.contentManagemenet = contentManagemenet;
    }
    async build(files) {
        const [banner1_file] = files.banner1;
        const [banner2_file] = files.banner2;
        const [banner3_file] = files.banner3;
        const [banner4_file] = files.banner4;
        const banners = {
            banner1: banner1_file.filename,
            banner2: banner2_file.filename,
            banner3: banner3_file.filename,
            banner4: banner4_file.filename,
        };
        const content = await new this.contentManagemenet({
            banners,
        }).save();
        return content;
    }
    async createUploadProfilebanner(files) {
        const content = await this.build(files);
        return content;
    }
    async uploadProfileImage(id, file) {
        const content = await this.contentManagemenet.findByIdAndUpdate(id);
        if (!content) {
            throw new common_1.HttpException(`content not found`, common_1.HttpStatus.BAD_REQUEST);
        }
        content.banners = {
            ...content.banners,
            banner1: file.banner1[0].filename,
            banner2: file.banner2[0].filename,
            banner3: file.banner3[0].filename,
            banner4: file.banner4[0].filename,
        };
        await content.save();
        return 'file upload';
    }
    async getAll(query) {
        let { page_number = '1', page_size = '50' } = query;
        page_number = Number(page_number);
        page_size = Number(page_size);
        const skip = (page_number - 1) * page_size;
        const content = await this.contentManagemenet.aggregate([
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
        return content;
    }
    async getByIdcontent(id) {
        const content = await this.contentManagemenet.findById(id);
        return content;
    }
    async deleteContent(id) {
        const content = await this.contentManagemenet.findById(id);
        if (!content) {
            throw new common_1.HttpException('content not found', common_1.HttpStatus.BAD_REQUEST);
        }
        content.is_deleted = true;
        await content.save();
        return content;
    }
};
exports.ContentManagementService = ContentManagementService;
exports.ContentManagementService = ContentManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(content_management_1.ContentManagement.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ContentManagementService);
//# sourceMappingURL=content_management.service.js.map