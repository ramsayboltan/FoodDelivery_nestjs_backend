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
var UsersController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const users_dto_1 = require("./users.dto");
const auth_guard_1 = require("../../helpers/guards/auth.guard");
const respone_interceptor_1 = require("../../helpers/interceptors/respone.interceptor");
const response_message_1 = require("../../helpers/decorators/response.message");
const platform_express_1 = require("@nestjs/platform-express");
let UsersController = UsersController_1 = class UsersController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(UsersController_1.name);
    }
    createUser(model) {
        console.log(model);
        return this.userService.createUser(model);
    }
    getAllUser(id, query) {
        this.logger.log('[getall:user]');
        return this.userService.getAllUser(id, query);
    }
    login(model) {
        return this.userService.login(model);
    }
    async getById(userId) {
        const user = await this.userService.getByIdUser(userId);
        if (!user) {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.BAD_REQUEST);
        }
        return user;
    }
    async softDelete(userId) {
        const user = this.userService.softDelete(userId);
        if (!user) {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.BAD_REQUEST);
        }
        return 'user removed';
    }
    updateUser(userId, model) {
        return this.userService.updateUser(userId, model);
    }
    uploadProfileImage(id, file) {
        return this.userService.uploadProfileImage(id, file);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('user created.'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.createUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('/getall/:id'),
    (0, common_1.UseGuards)(auth_guard_1.TokenAuthGuard),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    (0, response_message_1.ResponseMessage)('users fetched.'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_dto_1.PagingQueryDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('login successfully.'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.LoginModel]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/getById/:id'),
    (0, common_1.UseGuards)(auth_guard_1.TokenAuthGuard),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('fetched successfully.'),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getById", null);
__decorate([
    (0, common_1.Delete)('/remove/:id'),
    (0, common_1.UseGuards)(auth_guard_1.TokenAuthGuard),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "softDelete", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    (0, common_1.UseGuards)(auth_guard_1.TokenAuthGuard),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('user updated.'),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_dto_1.UserUpdateDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Put)('/uploadProfile/:id'),
    (0, common_1.UseGuards)(auth_guard_1.TokenAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'please upload image here',
        type: users_dto_1.fileUploadDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "uploadProfileImage", null);
exports.UsersController = UsersController = UsersController_1 = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map