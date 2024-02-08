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
exports.DriversController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const drivers_dto_1 = require("./drivers.dto");
const drivers_service_1 = require("./drivers.service");
const respone_interceptor_1 = require("../../helpers/interceptors/respone.interceptor");
const response_message_1 = require("../../helpers/decorators/response.message");
const driver_1 = require("../../mappers/driver");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer_1 = require("../../utils/multer");
const driver_filefields_payload = [
    { name: 'rc_image', maxCount: 1 },
    { name: 'govt_id_image', maxCount: 1 },
    { name: 'liscense_image', maxCount: 1 },
    { name: 'verified_picture', maxCount: 1 },
];
const UPLOAD_DIR = (0, path_1.join)(process.cwd(), 'assets/images');
const files_upload_midd = { storage: (0, multer_1.multerDiskUploader)(UPLOAD_DIR) };
let DriversController = class DriversController {
    constructor(driverService) {
        this.driverService = driverService;
    }
    async createDriver(files, body) {
        const driver = await this.driverService.createDriver(files, body);
        return driver;
    }
    async searchDriver(searchValue) {
        const data = await this.driverService.searchDriver(searchValue);
        return (0, driver_1.toSearchDriver)(data);
    }
    async getAllDriver(id, query) {
        const driver = await this.driverService.getAllDrivers(id, query);
        return driver;
    }
    async getByIdDriver(id) {
        const driver = await this.driverService.getByIdDriver(id);
        return (0, driver_1.toDriver)(driver);
    }
    async updateDriver(id, model) {
        const driver = await this.driverService.updateDriver(id, model);
        return driver;
    }
    async deleteDriver(id) {
        const driver = await this.driverService.deleteDriver(id);
        return driver;
    }
    driverUploadProfile(id, files) {
        return this.driverService.uploadProfileImage(id, files);
    }
    async driverFilter(query) {
        const data = await this.driverService.driverFilter(query);
        return (0, driver_1.toSearchDriver)(data);
    }
};
exports.DriversController = DriversController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, swagger_1.ApiBody)({ type: drivers_dto_1.createDriverDto }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, response_message_1.ResponseMessage)('driver created'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)(driver_filefields_payload, files_upload_midd)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, drivers_dto_1.createDriverDto]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "createDriver", null);
__decorate([
    (0, common_1.Get)('/search'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Query)('searchValue')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "searchDriver", null);
__decorate([
    (0, common_1.Get)('/getall/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('driver fetched'),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, drivers_dto_1.PagingQueryDto]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "getAllDriver", null);
__decorate([
    (0, common_1.Get)('/getById/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('diver fetched'),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "getByIdDriver", null);
__decorate([
    (0, common_1.Put)('/updateDriver/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, drivers_dto_1.updateDriverDto]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "updateDriver", null);
__decorate([
    (0, common_1.Delete)('/deleteDriver/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "deleteDriver", null);
__decorate([
    (0, common_1.Put)('/uploadProfiley/:id'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: drivers_dto_1.DriverFileUploadDto }),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)(driver_filefields_payload, files_upload_midd)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, drivers_dto_1.DriverFileUploadDto]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "driverUploadProfile", null);
__decorate([
    (0, common_1.Get)('/filter'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('diver fetched'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [drivers_dto_1.driverFilterDto]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "driverFilter", null);
exports.DriversController = DriversController = __decorate([
    (0, swagger_1.ApiTags)('drivers'),
    (0, common_1.Controller)('drivers'),
    __metadata("design:paramtypes", [drivers_service_1.DriversService])
], DriversController);
//# sourceMappingURL=drivers.controller.js.map