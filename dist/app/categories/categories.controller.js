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
var CategoriesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const categories_dto_1 = require("./categories.dto");
const categories_service_1 = require("./categories.service");
const respone_interceptor_1 = require("../../helpers/interceptors/respone.interceptor");
const response_message_1 = require("../../helpers/decorators/response.message");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer_1 = require("../../utils/multer");
const category_filefield_payload = [{ name: 'avatar', maxCount: 1 }];
const UPLOAD_DIR = (0, path_1.join)(process.cwd(), 'assets/images');
const files_upload_midd = { storage: (0, multer_1.multerDiskUploader)(UPLOAD_DIR) };
let CategoriesController = CategoriesController_1 = class CategoriesController {
    constructor(categoryService) {
        this.categoryService = categoryService;
        this.logger = new common_1.Logger(CategoriesController_1.name);
    }
    async createCategory(files, body) {
        console.log('category create>>>>>>>>>>>>>>>...start', files, body);
        const category = await this.categoryService.createCategory(files, body);
        return category;
    }
    async getAllCategory(id, query) {
        this.logger.log('[getall: Category');
        return this.categoryService.getAllCategory(id, query);
    }
    async getByIdCategory(id) {
        const category = await this.categoryService.getByIdCategory(id);
        return category;
    }
    async updateCategory(id, model) {
        const category = await this.categoryService.updateCategory(id, model);
        return category;
    }
    async uploadProfileImage(id, file) {
        const category = await this.categoryService.uploadProfileImage(id, file);
        return category;
    }
    async deleteCategory(id) {
        const data = await this.categoryService.categoryDelete(id);
        return data;
    }
    async searchCustomer(name) {
        const data = await this.categoryService.searchCategory(name);
        return data;
    }
    async filterCustomer(query) {
        const data = await this.categoryService.filterCategory(query);
        return data;
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, response_message_1.ResponseMessage)('category created'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)(category_filefield_payload, files_upload_midd)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, categories_dto_1.createCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)('/getAll/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('category fetched.'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, categories_dto_1.PagingQueryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getAllCategory", null);
__decorate([
    (0, common_1.Get)('/getById/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('Category fetched'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getByIdCategory", null);
__decorate([
    (0, common_1.Put)('/updateCategory/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, response_message_1.ResponseMessage)(' Category updated'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, categories_dto_1.updateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Put)('/uploadProfile/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, swagger_1.ApiBody)({
        description: 'please upload image here',
        type: categories_dto_1.categoryUploadDto,
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', files_upload_midd)),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "uploadProfileImage", null);
__decorate([
    (0, common_1.Delete)('/deleteCategory/:id'),
    (0, response_message_1.ResponseMessage)(' Category deleted'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Get)('/search'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "searchCustomer", null);
__decorate([
    (0, common_1.Get)('/filter'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [categories_dto_1.categoryDtoFilter]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "filterCustomer", null);
exports.CategoriesController = CategoriesController = CategoriesController_1 = __decorate([
    (0, swagger_1.ApiTags)('category'),
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map