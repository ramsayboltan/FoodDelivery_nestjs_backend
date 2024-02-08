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
exports.customerFilterDto = exports.PagingQueryDto = exports.deleteManyDto = exports.updateUserDto = exports.createCustomerDto = exports.CustomerAddressUpdateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const address_dto_1 = require("../address/address.dto");
const class_validator_1 = require("class-validator");
class CustomerAddressUpdateDto {
}
exports.CustomerAddressUpdateDto = CustomerAddressUpdateDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CustomerAddressUpdateDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CustomerAddressUpdateDto.prototype, "is_activated", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CustomerAddressUpdateDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CustomerAddressUpdateDto.prototype, "state", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CustomerAddressUpdateDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CustomerAddressUpdateDto.prototype, "zip_code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CustomerAddressUpdateDto.prototype, "address_line1", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CustomerAddressUpdateDto.prototype, "address_line2", void 0);
var genderEnum;
(function (genderEnum) {
    genderEnum["MALE"] = "male";
    genderEnum["FEMALE"] = "female";
    genderEnum["OTHER"] = "other";
})(genderEnum || (genderEnum = {}));
class Location {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Location.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], Location.prototype, "coordinates", void 0);
class createCustomerDto {
}
exports.createCustomerDto = createCustomerDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createCustomerDto.prototype, "fullname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createCustomerDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsStrongPassword)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createCustomerDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], createCustomerDto.prototype, "dob", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(genderEnum),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createCustomerDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Location)
], createCustomerDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], createCustomerDto.prototype, "mode", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createCustomerDto.prototype, "contact_number", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createCustomerDto.prototype, "alter_contact_number", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createCustomerDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createCustomerDto.prototype, "admin_note", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: [address_dto_1.CreateAddressDtoForExtend] }),
    __metadata("design:type", Array)
], createCustomerDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], createCustomerDto.prototype, "is_activated", void 0);
class updateUserDto {
}
exports.updateUserDto = updateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], updateUserDto.prototype, "fullname", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], updateUserDto.prototype, "dob", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(genderEnum),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], updateUserDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Location)
], updateUserDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], updateUserDto.prototype, "contact_number", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], updateUserDto.prototype, "alter_contact_number", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], updateUserDto.prototype, "is_activated", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], updateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], updateUserDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], updateUserDto.prototype, "admin_note", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({ type: [CustomerAddressUpdateDto] }),
    __metadata("design:type", Array)
], updateUserDto.prototype, "address", void 0);
class deleteManyDto {
}
exports.deleteManyDto = deleteManyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], deleteManyDto.prototype, "customer_ids", void 0);
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
var OrderEnum;
(function (OrderEnum) {
    OrderEnum["ASCENDING"] = "ascending";
    OrderEnum["DESCENDING"] = "descending";
})(OrderEnum || (OrderEnum = {}));
class customerFilterDto {
}
exports.customerFilterDto = customerFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", String)
], customerFilterDto.prototype, "is_active", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", String)
], customerFilterDto.prototype, "is_inactive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsEnum)(OrderEnum),
    __metadata("design:type", String)
], customerFilterDto.prototype, "sort_order", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], customerFilterDto.prototype, "date_from", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], customerFilterDto.prototype, "date_to", void 0);
//# sourceMappingURL=customers.dto.js.map