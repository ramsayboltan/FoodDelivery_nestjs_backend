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
exports.storeSchema = exports.Store = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const users_schema_1 = require("./users.schema");
const mongoose_2 = require("mongoose");
const modes_schema_1 = require("./modes.schema");
let Store = class Store {
};
exports.Store = Store;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", users_schema_1.User)
], Store.prototype, "owner", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Mode' }),
    __metadata("design:type", modes_schema_1.Mode)
], Store.prototype, "mode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], Store.prototype, "is_deleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Store.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Store.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Store.prototype, "contact_number", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        account_number: { type: String, required: true, default: '0' },
        IFC_code: { type: String, required: true, default: '0' },
        bank_name: { type: String, required: true, default: '0' },
    })),
    __metadata("design:type", Object)
], Store.prototype, "bank_details", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Store.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Store.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Store.prototype, "website", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        country: { type: String, required: false },
        state: { type: String, required: false },
        city: { type: String, required: false },
        zip_code: { type: String, required: false },
        address_line1: { type: String, required: false },
        address_line2: { type: String, required: false },
    })),
    __metadata("design:type", Object)
], Store.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        monday: {
            open: { required: false, type: Date },
            close: { required: false, type: Date },
            status: {
                type: String,
                enum: ['open', 'close'],
                required: true,
            },
        },
        tuesday: {
            open: { required: false, type: Date },
            close: { required: false, type: Date },
            status: {
                type: String,
                enum: ['open', 'close'],
                required: true,
            },
        },
        wednesday: {
            open: { required: false, type: Date },
            close: { required: false, type: Date },
            status: {
                type: String,
                enum: ['open', 'close'],
                required: true,
            },
        },
        thursday: {
            open: { required: false, type: Date },
            close: { required: false, type: Date },
            status: {
                type: String,
                enum: ['open', 'close'],
                required: true,
            },
        },
        friday: {
            open: { required: false, type: Date },
            close: { required: false, type: Date },
            status: {
                type: String,
                enum: ['open', 'close'],
                required: true,
            },
        },
        saturday: {
            open: { required: false, type: Date },
            close: { required: false, type: Date },
            status: {
                type: String,
                enum: ['open', 'close'],
                required: true,
            },
        },
        sunday: {
            open: { required: false, type: Date },
            close: { required: false, type: Date },
            status: {
                type: String,
                enum: ['open', 'close'],
                required: true,
            },
        },
    })),
    __metadata("design:type", Object)
], Store.prototype, "opening_closing", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], Store.prototype, "delivery_radius", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: true }),
    __metadata("design:type", Boolean)
], Store.prototype, "is_activated", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now() }),
    __metadata("design:type", Date)
], Store.prototype, "updated_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now() }),
    __metadata("design:type", Date)
], Store.prototype, "created_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Store.prototype, "note", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Store.prototype, "admin_note", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: false }),
    __metadata("design:type", Boolean)
], Store.prototype, "best_selller", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        platform: {
            type: String,
        },
        ip: {
            type: String,
        },
        os: {
            type: String,
        },
        browser: {
            type: String,
        },
    })),
    __metadata("design:type", Object)
], Store.prototype, "metadata", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        address: { type: String },
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number] },
    })),
    __metadata("design:type", Object)
], Store.prototype, "location", void 0);
exports.Store = Store = __decorate([
    (0, mongoose_1.Schema)()
], Store);
exports.storeSchema = mongoose_1.SchemaFactory.createForClass(Store);
//# sourceMappingURL=store.schema.js.map