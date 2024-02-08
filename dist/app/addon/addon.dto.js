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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addonFilterDto = exports.updateAddonDto = exports.PagingQueryDto = exports.CreateAddonDto = exports.CreateAddonDtoForExtend = exports.addon_dto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class addon_dto {
}
exports.addon_dto = addon_dto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], addon_dto.prototype, "itemName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], addon_dto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], addon_dto.prototype, "price", void 0);
class CreateAddonDtoForExtend {
}
exports.CreateAddonDtoForExtend = CreateAddonDtoForExtend;
__decorate([
    (0, swagger_1.ApiProperty)({ type: addon_dto }),
    __metadata("design:type", addon_dto)
], CreateAddonDtoForExtend.prototype, "addon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: false }),
    __metadata("design:type", Object)
], CreateAddonDtoForExtend.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Boolean)
], CreateAddonDtoForExtend.prototype, "is_activated", void 0);
class CreateAddonDto {
}
exports.CreateAddonDto = CreateAddonDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAddonDto.prototype, "itemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAddonDto.prototype, "mode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: addon_dto }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", addon_dto)
], CreateAddonDto.prototype, "addon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: false }),
    __metadata("design:type", Object)
], CreateAddonDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Boolean)
], CreateAddonDto.prototype, "is_activated", void 0);
class PagingQueryDto {
}
exports.PagingQueryDto = PagingQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PagingQueryDto.prototype, "page_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PagingQueryDto.prototype, "page_size", void 0);
class updateAddonDto {
}
exports.updateAddonDto = updateAddonDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: addon_dto }),
    __metadata("design:type", addon_dto)
], updateAddonDto.prototype, "addon", void 0);
var OrderEnum;
(function (OrderEnum) {
    OrderEnum["ASCENDING"] = "ascending";
    OrderEnum["DESCENDING"] = "descending";
})(OrderEnum || (OrderEnum = {}));
class addonFilterDto {
}
exports.addonFilterDto = addonFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], addonFilterDto.prototype, "is_active", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], addonFilterDto.prototype, "is_inactive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsEnum)(OrderEnum),
    __metadata("design:type", String)
], addonFilterDto.prototype, "sort_order", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], addonFilterDto.prototype, "date_from", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], addonFilterDto.prototype, "date_to", void 0);
//# sourceMappingURL=addon.dto.js.map