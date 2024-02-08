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
var ContentManagementController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentManagementController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const content_management_service_1 = require("./content_management.service");
const respone_interceptor_1 = require("../../helpers/interceptors/respone.interceptor");
const response_message_1 = require("../../helpers/decorators/response.message");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer_1 = require("../../utils/multer");
const content_management_dto_1 = require("./content_management.dto");
const content_management_dto_2 = require("./content_management.dto");
const content_filefield_payload = [
    { name: 'banner1', maxCount: 1 },
    { name: 'banner2', maxCount: 1 },
    { name: 'banner3', maxCount: 1 },
    { name: 'banner4', maxCount: 1 },
];
const UPLOAD_DIR = (0, path_1.join)(process.cwd(), 'assets/images');
const files_upload_midd = { storage: (0, multer_1.multerDiskUploader)(UPLOAD_DIR) };
let ContentManagementController = ContentManagementController_1 = class ContentManagementController {
    constructor(contentService) {
        this.contentService = contentService;
        this.logger = new common_1.Logger(ContentManagementController_1.name);
    }
    async createContentBanner(files) {
        const category = await this.contentService.createUploadProfilebanner(files);
        return category;
    }
    driverUploadProfile(id, files) {
        return this.contentService.uploadProfileImage(id, files);
    }
    async getAll(query) {
        this.logger.log('[getall: ContentManagement');
        const data = await this.contentService.getAll(query);
        return data;
    }
    async getByIdCategory(id) {
        const content = await this.contentService.getByIdcontent(id);
        return content;
    }
    async deleteContent(id) {
        const data = await this.contentService.deleteContent(id);
        return data;
    }
};
exports.ContentManagementController = ContentManagementController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, response_message_1.ResponseMessage)('category created'),
    (0, swagger_1.ApiBody)({ type: content_management_dto_1.createUploadProfileDto }),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)(content_filefield_payload, files_upload_midd)),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [content_management_dto_1.createUploadProfileDto]),
    __metadata("design:returntype", Promise)
], ContentManagementController.prototype, "createContentBanner", null);
__decorate([
    (0, common_1.Put)('/uploadProfiley/:id'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: content_management_dto_1.createUploadProfileDto }),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)(content_filefield_payload, files_upload_midd)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, content_management_dto_1.createUploadProfileDto]),
    __metadata("design:returntype", Promise)
], ContentManagementController.prototype, "driverUploadProfile", null);
__decorate([
    (0, common_1.Get)('/getall'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('content fetched.'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [content_management_dto_2.PagingQueryDto]),
    __metadata("design:returntype", Promise)
], ContentManagementController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/getById/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('content fetched'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentManagementController.prototype, "getByIdCategory", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentManagementController.prototype, "deleteContent", null);
exports.ContentManagementController = ContentManagementController = ContentManagementController_1 = __decorate([
    (0, swagger_1.ApiTags)('content_Management'),
    (0, common_1.Controller)('content-management'),
    __metadata("design:paramtypes", [content_management_service_1.ContentManagementService])
], ContentManagementController);
//# sourceMappingURL=content_management.controller.js.map