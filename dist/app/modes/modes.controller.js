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
var ModesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModesController = void 0;
const common_1 = require("@nestjs/common");
const modes_service_1 = require("./modes.service");
const swagger_1 = require("@nestjs/swagger");
const modes_dto_1 = require("./modes.dto");
const respone_interceptor_1 = require("../../helpers/interceptors/respone.interceptor");
const response_message_1 = require("../../helpers/decorators/response.message");
let ModesController = ModesController_1 = class ModesController {
    constructor(modeService) {
        this.modeService = modeService;
        this.logger = new common_1.Logger(ModesController_1.name);
    }
    createMode(model) {
        return this.modeService.createMode(model);
    }
    async getAllMode(query) {
        this.logger.log('[getAll: mode');
        const mode = await this.modeService.getAllMode(query);
        return mode;
    }
    async getById(id) {
        const mode = await this.modeService.getById(id);
        if (!mode) {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.BAD_REQUEST);
        }
        return mode;
    }
    async updateMode(id, model) {
        const updatedMode = await this.modeService.updateMode(id, model);
        return updatedMode;
    }
    async deleteMode(id) {
        const mode = await this.modeService.DeleteMode(id);
        if (!mode) {
            throw new common_1.HttpException('mode not found', common_1.HttpStatus.BAD_REQUEST);
        }
        return 'mode removed';
    }
};
exports.ModesController = ModesController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('mode created.'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [modes_dto_1.createModeDto]),
    __metadata("design:returntype", void 0)
], ModesController.prototype, "createMode", null);
__decorate([
    (0, common_1.Get)('/getall'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('mode fetched.'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [modes_dto_1.PagingQueryDto]),
    __metadata("design:returntype", Promise)
], ModesController.prototype, "getAllMode", null);
__decorate([
    (0, common_1.Get)('/getById/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('mode fetched'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModesController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)('/updateMode/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, modes_dto_1.ModeUpdateDto]),
    __metadata("design:returntype", Promise)
], ModesController.prototype, "updateMode", null);
__decorate([
    (0, common_1.Delete)('/deleteMode/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModesController.prototype, "deleteMode", null);
exports.ModesController = ModesController = ModesController_1 = __decorate([
    (0, common_1.Controller)('modes'),
    (0, swagger_1.ApiTags)('modes'),
    __metadata("design:paramtypes", [modes_service_1.ModesService])
], ModesController);
//# sourceMappingURL=modes.controller.js.map