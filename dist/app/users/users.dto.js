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
exports.fileUploadDto = exports.UserUpdateDto = exports.LoginModel = exports.HeaderToken = exports.PagingQueryDto = exports.createUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var genderEnum;
(function (genderEnum) {
    genderEnum["MALE"] = "male";
    genderEnum["FEMALE"] = "female";
    genderEnum["OTHER"] = "other";
})(genderEnum || (genderEnum = {}));
var roleEnum;
(function (roleEnum) {
    roleEnum["ADMIN"] = "admin";
    roleEnum["OWNER"] = "owner";
    roleEnum["CUSTOMER"] = "customer";
    roleEnum["DRIVER"] = "driver";
})(roleEnum || (roleEnum = {}));
class Location {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], Location.prototype, "coordinates", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Location.prototype, "address", void 0);
class createUserDto {
}
exports.createUserDto = createUserDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], createUserDto.prototype, "is_activated", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createUserDto.prototype, "fullname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsStrongPassword)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], createUserDto.prototype, "dob", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(genderEnum),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createUserDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createUserDto.prototype, "mode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ type: Location, required: true }),
    __metadata("design:type", Location)
], createUserDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createUserDto.prototype, "contact_number", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createUserDto.prototype, "alter_contact_number", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(roleEnum),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], createUserDto.prototype, "role", void 0);
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
class HeaderToken {
}
exports.HeaderToken = HeaderToken;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], HeaderToken.prototype, 'x-access-token', void 0);
class LoginModel {
}
exports.LoginModel = LoginModel;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginModel.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginModel.prototype, "password", void 0);
class UserUpdateDto {
}
exports.UserUpdateDto = UserUpdateDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "fullname", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "contact_number", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "altr_contact_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UserUpdateDto.prototype, "dob", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(genderEnum),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], UserUpdateDto.prototype, "is_activated", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        type: Location,
    }),
    __metadata("design:type", Location)
], UserUpdateDto.prototype, "location", void 0);
class fileUploadDto {
}
exports.fileUploadDto = fileUploadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], fileUploadDto.prototype, "image", void 0);
//# sourceMappingURL=users.dto.js.map