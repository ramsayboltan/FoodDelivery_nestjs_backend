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
var TagController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagController = void 0;
const common_1 = require("@nestjs/common");
const tag_service_1 = require("./tag.service");
const swagger_1 = require("@nestjs/swagger");
const tag_dto_1 = require("./tag.dto");
const respone_interceptor_1 = require("../../helpers/interceptors/respone.interceptor");
const response_message_1 = require("../../helpers/decorators/response.message");
let TagController = TagController_1 = class TagController {
    constructor(tagService) {
        this.tagService = tagService;
        this.logger = new common_1.Logger(TagController_1.name);
    }
    createUser(model) {
        console.log(model);
        return this.tagService.createtag(model);
    }
    getAllTag(id, query) {
        return this.tagService.getAlltag(id, query);
    }
    async softDelete(tagId) {
        const tag = this.tagService.softDelete(tagId);
        if (!tag) {
            throw new common_1.HttpException('tag not found', common_1.HttpStatus.BAD_REQUEST);
        }
        return 'tag removed';
    }
    updateUser(userId, model) {
        return this.tagService.updateUser(userId, model);
    }
    async searchCustomer(name) {
        const data = await this.tagService.searchTag(name);
        return data;
    }
    async filterCustomer(query) {
        const data = await this.tagService.filterTag(query);
        return data;
    }
};
exports.TagController = TagController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('user created.'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_dto_1.createTagDto]),
    __metadata("design:returntype", void 0)
], TagController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('/getall/:id'),
    (0, response_message_1.ResponseMessage)('tags fetched.'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tag_dto_1.PagingQueryDto]),
    __metadata("design:returntype", void 0)
], TagController.prototype, "getAllTag", null);
__decorate([
    (0, common_1.Delete)('/remove/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "softDelete", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('tag updated.'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tag_dto_1.TagUpdateDto]),
    __metadata("design:returntype", void 0)
], TagController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)('/search'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "searchCustomer", null);
__decorate([
    (0, common_1.Get)('/filter'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_dto_1.tagFilterDto]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "filterCustomer", null);
exports.TagController = TagController = TagController_1 = __decorate([
    (0, common_1.Controller)('Tags'),
    (0, swagger_1.ApiTags)('Tags'),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], TagController);
//# sourceMappingURL=tag.controller.js.map