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
exports.AddonController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const addon_dto_1 = require("./addon.dto");
const addon_service_1 = require("./addon.service");
const respone_interceptor_1 = require("../../helpers/interceptors/respone.interceptor");
const response_message_1 = require("../../helpers/decorators/response.message");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer_1 = require("../../utils/multer");
const category_filefield_payload = [{ name: 'image', maxCount: 1 }];
const UPLOAD_DIR = (0, path_1.join)(process.cwd(), 'assets/images');
const files_upload_midd = { storage: (0, multer_1.multerDiskUploader)(UPLOAD_DIR) };
let AddonController = class AddonController {
    constructor(addonService) {
        this.addonService = addonService;
    }
    async createAddon(files, model) {
        const addon = await this.addonService.createAddon(files, model);
        return addon;
    }
    async getAllAddon(id, query) {
        return this.addonService.getAllAddon(id, query);
    }
    async deleteAddon(id) {
        const addon = await this.addonService.deleteAddon(id);
        return addon;
    }
    async searchCustomer(name) {
        const data = await this.addonService.searchAddon(name);
        return data;
    }
    async filterCustomer(query) {
        const data = await this.addonService.filterAddon(query);
        return data;
    }
};
exports.AddonController = AddonController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, response_message_1.ResponseMessage)('addon created'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)(category_filefield_payload, files_upload_midd)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, addon_dto_1.CreateAddonDto]),
    __metadata("design:returntype", Promise)
], AddonController.prototype, "createAddon", null);
__decorate([
    (0, common_1.Get)('/getAll/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('addon fetched.'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, addon_dto_1.PagingQueryDto]),
    __metadata("design:returntype", Promise)
], AddonController.prototype, "getAllAddon", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    (0, response_message_1.ResponseMessage)('addon deleted'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AddonController.prototype, "deleteAddon", null);
__decorate([
    (0, common_1.Get)('/search'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AddonController.prototype, "searchCustomer", null);
__decorate([
    (0, common_1.Get)('/filter'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addon_dto_1.addonFilterDto]),
    __metadata("design:returntype", Promise)
], AddonController.prototype, "filterCustomer", null);
exports.AddonController = AddonController = __decorate([
    (0, swagger_1.ApiTags)('addon'),
    (0, common_1.Controller)('addon'),
    __metadata("design:paramtypes", [addon_service_1.AddonService])
], AddonController);
//# sourceMappingURL=addon.controller.js.map