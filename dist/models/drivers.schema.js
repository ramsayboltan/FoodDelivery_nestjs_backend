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
exports.DriverSchema = exports.Driver = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const users_schema_1 = require("./users.schema");
const address_schema_1 = require("./address.schema");
const modes_schema_1 = require("./modes.schema");
let Driver = class Driver {
};
exports.Driver = Driver;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: users_schema_1.User.name }),
    __metadata("design:type", users_schema_1.User)
], Driver.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Mode' }),
    __metadata("design:type", modes_schema_1.Mode)
], Driver.prototype, "mode", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        govt_id_image: { type: String, required: false, default: '' },
        liscense_image: { type: String, required: false, default: '' },
        verified_picture: { type: String, required: false, default: '' },
        rc_image: { type: String, required: false, default: '' },
    })),
    __metadata("design:type", Object)
], Driver.prototype, "documents", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        weekly_order: { type: String, required: true, default: '0' },
        weekly_rating: { type: String, required: true, default: '0' },
        weekly_earning: { type: String, required: true, default: '0' },
        active_hours: { type: String, required: true, default: '0' },
    })),
    __metadata("design:type", Object)
], Driver.prototype, "statics", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        by_earning: { type: String, required: true, default: '0' },
        by_rating: { type: String, required: true, default: '0' },
        by_riding: { type: String, required: true, default: '0' },
    })),
    __metadata("design:type", Object)
], Driver.prototype, "driver_criteria", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        account_number: { type: String, required: true, default: '0' },
        IFC_code: { type: String, required: true, default: '0' },
        bank_name: { type: String, required: true, default: '0' },
    })),
    __metadata("design:type", Object)
], Driver.prototype, "bank_details", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        platform: { type: String },
        os: { type: String },
        browser: { type: String },
        ip: { type: String },
    })),
    __metadata("design:type", Object)
], Driver.prototype, "metadata", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        vehicle_number: { type: String, required: false },
        vehicle_issue_date: { type: String, required: false },
        vehicle_exp_date: { type: String, required: false },
        dl_number: { type: String, required: false },
        dl_issue_date: { type: String, required: false },
        dl_exp_date: { type: String, required: false },
    })),
    __metadata("design:type", Object)
], Driver.prototype, "vehicle_details", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Driver.prototype, "note", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Driver.prototype, "admin_note", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now() }),
    __metadata("design:type", Date)
], Driver.prototype, "created_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now() }),
    __metadata("design:type", Date)
], Driver.prototype, "updated_at", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose.Schema.Types.ObjectId, ref: address_schema_1.Address.name }]),
    __metadata("design:type", Array)
], Driver.prototype, "address", void 0);
exports.Driver = Driver = __decorate([
    (0, mongoose_1.Schema)()
], Driver);
exports.DriverSchema = mongoose_1.SchemaFactory.createForClass(Driver);
//# sourceMappingURL=drivers.schema.js.map