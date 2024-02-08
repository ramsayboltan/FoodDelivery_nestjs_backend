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
var SubCategoryController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sub_category_dto_1 = require("./sub-category.dto");
const sub_category_service_1 = require("./sub-category.service");
const platform_express_1 = require("@nestjs/platform-express");
const respone_interceptor_1 = require("../../helpers/interceptors/respone.interceptor");
const path_1 = require("path");
const multer_1 = require("../../utils/multer");
const response_message_1 = require("../../helpers/decorators/response.message");
const category_filefield_payload = [{ name: 'image', maxCount: 1 }];
const UPLOAD_DIR = (0, path_1.join)(process.cwd(), 'assets/images');
const files_upload_midd = { storage: (0, multer_1.multerDiskUploader)(UPLOAD_DIR) };
let SubCategoryController = SubCategoryController_1 = class SubCategoryController {
    constructor(subCategoryService) {
        this.subCategoryService = subCategoryService;
        this.logger = new common_1.Logger(SubCategoryController_1.name);
    }
    async createSub(files, body) {
        const sub = await this.subCategoryService.createSub(files, body);
        return sub;
    }
    async getAllSub(query) {
        this.logger.log('[getall: sub-Category');
        return this.subCategoryService.getAllSub(query);
    }
    async getByIdCategory(id) {
        const category = await this.subCategoryService.getByIdSub(id);
        return category;
    }
    async updateSub(id, model) {
        const sub = await this.subCategoryService.updateSub(id, model);
        return sub;
    }
    async updateSC(id, files, model) {
        const sub = await this.subCategoryService.updateSC(id, files, model);
        return sub;
    }
    async deleteSub(id) {
        const data = await this.subCategoryService.deleteSub(id);
        return data;
    }
};
exports.SubCategoryController = SubCategoryController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, response_message_1.ResponseMessage)('subCategory fetched.'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)(category_filefield_payload, files_upload_midd)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, sub_category_dto_1.SubCategoryDto]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "createSub", null);
__decorate([
    (0, common_1.Get)('/getAll'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('subCategory fetched.'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sub_category_dto_1.PagingQueryDto]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "getAllSub", null);
__decorate([
    (0, common_1.Get)('/getById/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('subCategory fetched'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "getByIdCategory", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('updated subCategory'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sub_category_dto_1.updateSubCategory]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "updateSub", null);
__decorate([
    (0, common_1.Put)('/updateSc/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, response_message_1.ResponseMessage)('updated subCategory'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)(category_filefield_payload, files_upload_midd)),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)(category_filefield_payload, files_upload_midd)),
    __param(0, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, sub_category_dto_1.updateSubCategory]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "updateSC", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    (0, response_message_1.ResponseMessage)('  subCategory deleted'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "deleteSub", null);
exports.SubCategoryController = SubCategoryController = SubCategoryController_1 = __decorate([
    (0, swagger_1.ApiTags)('subCategory'),
    (0, common_1.Controller)('sub-category'),
    __metadata("design:paramtypes", [sub_category_service_1.SubCategoryService])
], SubCategoryController);
//# sourceMappingURL=sub-category.controller.js.map