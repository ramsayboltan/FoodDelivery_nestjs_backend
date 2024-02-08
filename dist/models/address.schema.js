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
exports.addressSchema = exports.Address = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const users_schema_1 = require("./users.schema");
const mongoose_2 = require("mongoose");
const { Types } = mongoose_2.Schema;
const mongoose_3 = require("mongoose");
const modes_schema_1 = require("./modes.schema");
let Address = class Address {
};
exports.Address = Address;
__decorate([
    (0, mongoose_1.Prop)({ type: Types.ObjectId, ref: users_schema_1.User.name }),
    __metadata("design:type", users_schema_1.User)
], Address.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_3.default.Schema.Types.ObjectId, ref: 'Mode' }),
    __metadata("design:type", modes_schema_1.Mode)
], Address.prototype, "mode", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['home', 'office', 'others'],
        required: false,
    }),
    __metadata("design:type", String)
], Address.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Address.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Address.prototype, "zip_code", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Address.prototype, "address_line1", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Address.prototype, "address_line2", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now() }),
    __metadata("design:type", Date)
], Address.prototype, "updated_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now() }),
    __metadata("design:type", Date)
], Address.prototype, "created_at", void 0);
exports.Address = Address = __decorate([
    (0, mongoose_1.Schema)()
], Address);
exports.addressSchema = mongoose_1.SchemaFactory.createForClass(Address);
//# sourceMappingURL=address.schema.js.map