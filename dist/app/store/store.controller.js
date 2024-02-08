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
exports.StoreController = void 0;
const common_1 = require("@nestjs/common");
const store_service_1 = require("./store.service");
const swagger_1 = require("@nestjs/swagger");
const store_dto_1 = require("./store.dto");
const respone_interceptor_1 = require("../../helpers/interceptors/respone.interceptor");
const response_message_1 = require("../../helpers/decorators/response.message");
const multer_1 = require("../../utils/multer");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const swagger_2 = require("@nestjs/swagger");
const UPLOAD_DIR = (0, path_1.join)(process.cwd(), 'assets/images');
const files_upload_midd = { storage: (0, multer_1.multerDiskUploader)(UPLOAD_DIR) };
let StoreController = class StoreController {
    constructor(storeService) {
        this.storeService = storeService;
    }
    async create(body) {
        return this.storeService.createStore(body);
    }
    async getAll(id, query) {
        const data = await this.storeService.getAll(id, query);
        return data;
    }
    async deleteStore(id) {
        const respone = await this.storeService.remove(id);
        return respone;
    }
    async getById(id) {
        return await this.storeService.getById(id);
    }
    async update(id, model) {
        const data = await this.storeService.update(id, model);
        return data;
    }
    async uploadImage(id, file) {
        const data = await this.storeService.uploadImage(id, file);
        return data;
    }
};
exports.StoreController = StoreController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('store created.'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.createStoreDto]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/getAll/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('store fetched.'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, store_dto_1.PagingQueryDto]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)('/remove/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "deleteStore", null);
__decorate([
    (0, common_1.Get)('/getById/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('store fetched.'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('store updated.'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, store_dto_1.updateStoreDto]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('/uploadImage/:id'),
    (0, swagger_2.ApiBody)({
        description: 'please upload image here',
        type: store_dto_1.UploadImageDto,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_2.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', files_upload_midd)),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "uploadImage", null);
exports.StoreController = StoreController = __decorate([
    (0, swagger_1.ApiTags)('stores'),
    (0, common_1.Controller)('stores'),
    __metadata("design:paramtypes", [store_service_1.StoreService])
], StoreController);
//# sourceMappingURL=store.controller.js.map