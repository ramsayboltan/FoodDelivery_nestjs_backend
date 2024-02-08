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
exports.driverFilterDto = exports.DriverFileUploadDto = exports.updateDriverDto = exports.createDriverDto = exports.Document_dto = exports.PagingQueryDto = exports.driverAddressUpdateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const users_dto_1 = require("../users/users.dto");
const class_validator_1 = require("class-validator");
const address_dto_1 = require("../address/address.dto");
class driverAddressUpdateDto {
}
exports.driverAddressUpdateDto = driverAddressUpdateDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], driverAddressUpdateDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], driverAddressUpdateDto.prototype, "is_activated", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], driverAddressUpdateDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], driverAddressUpdateDto.prototype, "state", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], driverAddressUpdateDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], driverAddressUpdateDto.prototype, "zip_code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], driverAddressUpdateDto.prototype, "address_line1", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], driverAddressUpdateDto.prototype, "address_line2", void 0);
class driver_criteria {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], driver_criteria.prototype, "by_earning", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], driver_criteria.prototype, "by_rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], driver_criteria.prototype, "by_riding", void 0);
class Bank_dto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Bank_dto.prototype, "account_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Bank_dto.prototype, "IFC_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Bank_dto.prototype, "bank_name", void 0);
class Static_dto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Static_dto.prototype, "weekly_order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Static_dto.prototype, "weekly_rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Static_dto.prototype, "weekly_earning", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Static_dto.prototype, "active_hours", void 0);
class Vehicle_detail {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Vehicle_detail.prototype, "vehicle_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Vehicle_detail.prototype, "vehicle_issue_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Vehicle_detail.prototype, "vehicle_exp_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Vehicle_detail.prototype, "dl_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Vehicle_detail.prototype, "dl_issue_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Vehicle_detail.prototype, "dl_exp_date", void 0);
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
class Document_dto {
}
exports.Document_dto = Document_dto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: false }),
    __metadata("design:type", Object)
], Document_dto.prototype, "liscense_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: false }),
    __metadata("design:type", Object)
], Document_dto.prototype, "govt_id_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: false }),
    __metadata("design:type", Object)
], Document_dto.prototype, "verified_picture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: false }),
    __metadata("design:type", Object)
], Document_dto.prototype, "rc_image", void 0);
class createDriverDto extends (0, swagger_1.PartialType)(users_dto_1.createUserDto) {
}
exports.createDriverDto = createDriverDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], createDriverDto.prototype, "mode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createDriverDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createDriverDto.prototype, "admin_note", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: Bank_dto }),
    __metadata("design:type", Bank_dto)
], createDriverDto.prototype, "bank_details", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Static_dto }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Static_dto)
], createDriverDto.prototype, "statics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: driver_criteria }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", driver_criteria)
], createDriverDto.prototype, "driver_criteria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Vehicle_detail }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Vehicle_detail)
], createDriverDto.prototype, "vehicle_details", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: false }),
    __metadata("design:type", Object)
], createDriverDto.prototype, "liscense_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: false }),
    __metadata("design:type", Object)
], createDriverDto.prototype, "govt_id_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: false }),
    __metadata("design:type", Object)
], createDriverDto.prototype, "verified_picture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', required: false }),
    __metadata("design:type", Object)
], createDriverDto.prototype, "rc_image", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: [address_dto_1.CreateAddressDtoForExtend] }),
    __metadata("design:type", Array)
], createDriverDto.prototype, "address", void 0);
class updateDriverDto extends (0, swagger_1.PartialType)(users_dto_1.UserUpdateDto) {
}
exports.updateDriverDto = updateDriverDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Static_dto)
], updateDriverDto.prototype, "statics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Vehicle_detail)
], updateDriverDto.prototype, "vehicle_details", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", driver_criteria)
], updateDriverDto.prototype, "driver_criteria", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: Bank_dto }),
    __metadata("design:type", Bank_dto)
], updateDriverDto.prototype, "bank_details", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], updateDriverDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], updateDriverDto.prototype, "admin_note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], updateDriverDto.prototype, "is_activated", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: [driverAddressUpdateDto] }),
    __metadata("design:type", Array)
], updateDriverDto.prototype, "address", void 0);
class DriverFileUploadDto {
}
exports.DriverFileUploadDto = DriverFileUploadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], DriverFileUploadDto.prototype, "liscense_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], DriverFileUploadDto.prototype, "govt_id_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], DriverFileUploadDto.prototype, "verified_picture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], DriverFileUploadDto.prototype, "rc_image", void 0);
var OrderEnum;
(function (OrderEnum) {
    OrderEnum["ASCENDING"] = "ascending";
    OrderEnum["DESCENDING"] = "descending";
})(OrderEnum || (OrderEnum = {}));
class driverFilterDto {
}
exports.driverFilterDto = driverFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", String)
], driverFilterDto.prototype, "is_active", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", String)
], driverFilterDto.prototype, "is_inactive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsEnum)(OrderEnum),
    __metadata("design:type", String)
], driverFilterDto.prototype, "by_earning", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsEnum)(OrderEnum),
    __metadata("design:type", String)
], driverFilterDto.prototype, "by_rating", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsEnum)(OrderEnum),
    __metadata("design:type", String)
], driverFilterDto.prototype, "by_riding", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsEnum)(OrderEnum),
    __metadata("design:type", String)
], driverFilterDto.prototype, "sort_order", void 0);
//# sourceMappingURL=drivers.dto.js.map