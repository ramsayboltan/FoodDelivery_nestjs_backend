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
exports.itemUploadDto = exports.itemDtoFilter = exports.PagingQueryDto = exports.ItemUpdatedDto = exports.createItemDto = exports.createAddonDtoForExtend = exports.addon_images_dto = exports.itemAddonDtoForExtend = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class addon_item {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], addon_item.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], addon_item.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], addon_item.prototype, "price", void 0);
class itemAddonDtoForExtend {
}
exports.itemAddonDtoForExtend = itemAddonDtoForExtend;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: addon_item }),
    __metadata("design:type", addon_item)
], itemAddonDtoForExtend.prototype, "addon", void 0);
class addon_images_dto {
}
exports.addon_images_dto = addon_images_dto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: false }),
    __metadata("design:type", Object)
], addon_images_dto.prototype, "image", void 0);
var vegEnum;
(function (vegEnum) {
    vegEnum["VEG"] = "veg";
    vegEnum["NON_VEG"] = "non_veg";
})(vegEnum || (vegEnum = {}));
class createAddonDtoForExtend {
}
exports.createAddonDtoForExtend = createAddonDtoForExtend;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createAddonDtoForExtend.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createAddonDtoForExtend.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createAddonDtoForExtend.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], createAddonDtoForExtend.prototype, "is_activated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: false }),
    __metadata("design:type", Object)
], createAddonDtoForExtend.prototype, "image", void 0);
class createItemDto {
}
exports.createItemDto = createItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createItemDto.prototype, "itemName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createItemDto.prototype, "menu", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createItemDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createItemDto.prototype, "mode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createItemDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createItemDto.prototype, "itemDsc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: false }),
    __metadata("design:type", Object)
], createItemDto.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createItemDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(vegEnum),
    __metadata("design:type", String)
], createItemDto.prototype, "vegetarian_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], createItemDto.prototype, "is_activated", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: [itemAddonDtoForExtend], required: false }),
    __metadata("design:type", Array)
], createItemDto.prototype, "addon", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: false }),
    __metadata("design:type", Object)
], createItemDto.prototype, "addon_images", void 0);
class ItemUpdatedDto {
}
exports.ItemUpdatedDto = ItemUpdatedDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ItemUpdatedDto.prototype, "itemName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ItemUpdatedDto.prototype, "itemDsc", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ItemUpdatedDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(vegEnum),
    __metadata("design:type", String)
], ItemUpdatedDto.prototype, "vegetarian_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ItemUpdatedDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ItemUpdatedDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ItemUpdatedDto.prototype, "admin_note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ItemUpdatedDto.prototype, "is_activated", void 0);
var OrderEnum;
(function (OrderEnum) {
    OrderEnum["ASCENDING"] = "ascending";
    OrderEnum["DESCENDING"] = "descending";
})(OrderEnum || (OrderEnum = {}));
class PagingQueryDto {
}
exports.PagingQueryDto = PagingQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PagingQueryDto.prototype, "page_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PagingQueryDto.prototype, "page_size", void 0);
class itemDtoFilter {
}
exports.itemDtoFilter = itemDtoFilter;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], itemDtoFilter.prototype, "is_active", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], itemDtoFilter.prototype, "is_inactive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], itemDtoFilter.prototype, "date_from", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], itemDtoFilter.prototype, "date_to", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsEnum)(OrderEnum),
    __metadata("design:type", String)
], itemDtoFilter.prototype, "sort_order", void 0);
class itemUploadDto {
}
exports.itemUploadDto = itemUploadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], itemUploadDto.prototype, "avatar", void 0);
//# sourceMappingURL=items.dto.js.map