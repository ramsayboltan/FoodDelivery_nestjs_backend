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
var ItemsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const items_dto_1 = require("./items.dto");
const items_service_1 = require("./items.service");
const response_message_1 = require("../../helpers/decorators/response.message");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer_1 = require("../../utils/multer");
const respone_interceptor_1 = require("../../helpers/interceptors/respone.interceptor");
const item_1 = require("../../mappers/item");
const item_filefields_payload = [
    { name: 'avatar', maxCount: 1 },
    { name: 'addon_images', maxCount: 1 },
];
const UPLOAD_DIR = (0, path_1.join)(process.cwd(), 'assets/images');
const files_upload_midd = { storage: (0, multer_1.multerDiskUploader)(UPLOAD_DIR) };
let ItemsController = ItemsController_1 = class ItemsController {
    constructor(itemService) {
        this.itemService = itemService;
        this.logger = new common_1.Logger(ItemsController_1.name);
    }
    async createItem(files, body) {
        const item = await this.itemService.createItem(files.avatar, body, files.addon_images);
        return item;
    }
    async getAll(id, query) {
        const data = await this.itemService.getAll(id, query);
        return data;
    }
    async getByIdItem(id) {
        return await this.itemService.getByIdItem(id);
    }
    async updateItem(id, model) {
        const item = await this.itemService.updateItem(id, model);
        return item;
    }
    async deleteItem(id) {
        const item = await this.itemService.deleteItem(id);
        if (!item) {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.BAD_REQUEST);
        }
        return 'user removed';
    }
    async searchCustomer(name) {
        const data = await this.itemService.searchItem(name);
        return data;
    }
    async filterCustomer(query) {
        const data = await this.itemService.filterItem(query);
        return (0, item_1.toSearchModel)(data);
    }
    async uploadProfileImage(id, file) {
        const category = await this.itemService.uploadProfileImage(id, file);
        return category;
    }
    async getByIdMode(id) {
        const data = await this.itemService.getByIdMode(id);
        return data;
    }
};
exports.ItemsController = ItemsController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, swagger_1.ApiBody)({ type: items_dto_1.createItemDto }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, response_message_1.ResponseMessage)('item created.'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)(item_filefields_payload, files_upload_midd)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, items_dto_1.createItemDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "createItem", null);
__decorate([
    (0, common_1.Get)('/getAll/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('item fetched.'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, items_dto_1.PagingQueryDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/getById/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('item fetched.'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "getByIdItem", null);
__decorate([
    (0, common_1.Put)('/updateItem/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('item updated.'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, items_dto_1.ItemUpdatedDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)('/delteItem/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "deleteItem", null);
__decorate([
    (0, common_1.Get)('/search'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "searchCustomer", null);
__decorate([
    (0, common_1.Get)('/filter'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [items_dto_1.itemDtoFilter]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "filterCustomer", null);
__decorate([
    (0, common_1.Put)('/uploadProfile/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, swagger_1.ApiBody)({
        description: 'please upload image here',
        type: items_dto_1.itemUploadDto,
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', files_upload_midd)),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "uploadProfileImage", null);
__decorate([
    (0, common_1.Get)('/getByIdMode/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('customer fetched.'),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "getByIdMode", null);
exports.ItemsController = ItemsController = ItemsController_1 = __decorate([
    (0, common_1.Controller)('items'),
    (0, swagger_1.ApiTags)('Items'),
    __metadata("design:paramtypes", [items_service_1.ItemsService])
], ItemsController);
//# sourceMappingURL=items.controller.js.map