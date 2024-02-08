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
var MenuController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const menu_dto_1 = require("./menu.dto");
const menu_service_1 = require("./menu.service");
const respone_interceptor_1 = require("../../helpers/interceptors/respone.interceptor");
const response_message_1 = require("../../helpers/decorators/response.message");
let MenuController = MenuController_1 = class MenuController {
    constructor(menuService) {
        this.menuService = menuService;
        this.logger = new common_1.Logger(MenuController_1.name);
    }
    async createMenu(body) {
        const menu = await this.menuService.createMenu(body);
        return menu;
    }
    async getAllMenu(id, query) {
        this.logger.log('[getall: Menu ]');
        return this.menuService.getAllMenu(id, query);
    }
    async getByIdMenu(id) {
        const menu = await this.menuService.getByIdMenu(id);
        return menu;
    }
    async updateMenu(id, model) {
        const menu = await this.menuService.updateMenu(id, model);
        return menu;
    }
    async deleteMenu(id) {
        const menu = await this.menuService.deleteMenu(id);
        return menu;
    }
};
exports.MenuController = MenuController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('menu created'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_dto_1.createMenuDto]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "createMenu", null);
__decorate([
    (0, common_1.Get)('/getAll/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('menu fetched'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, menu_dto_1.PagingQueryDto]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "getAllMenu", null);
__decorate([
    (0, common_1.Get)('/getById/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('menu fetched'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "getByIdMenu", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('updated menu'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, menu_dto_1.updateMenuDto]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "updateMenu", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('deleted menu'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "deleteMenu", null);
exports.MenuController = MenuController = MenuController_1 = __decorate([
    (0, swagger_1.ApiTags)('menu'),
    (0, common_1.Controller)('menu'),
    __metadata("design:paramtypes", [menu_service_1.MenuService])
], MenuController);
//# sourceMappingURL=menu.controller.js.map