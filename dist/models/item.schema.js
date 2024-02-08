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
exports.ItemSchema = exports.Item = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const menu_schema_1 = require("./menu.schema");
const category_schema_1 = require("./category.schema");
const addon_schema_1 = require("./addon.schema");
const modes_schema_1 = require("./modes.schema");
let Item = class Item {
};
exports.Item = Item;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }),
    __metadata("design:type", menu_schema_1.Menu)
], Item.prototype, "menu", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Category' }),
    __metadata("design:type", category_schema_1.Category)
], Item.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Mode' }),
    __metadata("design:type", modes_schema_1.Mode)
], Item.prototype, "mode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Item.prototype, "itemName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Item.prototype, "itemDsc", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        platform: { type: String },
        os: { type: String },
        browser: { type: String },
        ip: { type: String },
    })),
    __metadata("design:type", Object)
], Item.prototype, "metadata", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['veg', 'non_veg'],
    }),
    __metadata("design:type", String)
], Item.prototype, "vegetarian_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'true' }),
    __metadata("design:type", Boolean)
], Item.prototype, "is_activated", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], Item.prototype, "is_deleted", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Item.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Item.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Item.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Item.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Item.prototype, "note", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Item.prototype, "admin_note", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now() }),
    __metadata("design:type", Date)
], Item.prototype, "created_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now() }),
    __metadata("design:type", Date)
], Item.prototype, "updated_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: addon_schema_1.Addon.name }),
    __metadata("design:type", Array)
], Item.prototype, "addon", void 0);
exports.Item = Item = __decorate([
    (0, mongoose_1.Schema)()
], Item);
exports.ItemSchema = mongoose_1.SchemaFactory.createForClass(Item);
//# sourceMappingURL=item.schema.js.map