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
exports.addonSchema = exports.Addon = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const item_schema_1 = require("./item.schema");
const { Types } = mongoose_2.Schema;
const mongoose_3 = require("mongoose");
const modes_schema_1 = require("./modes.schema");
let Addon = class Addon {
};
exports.Addon = Addon;
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_3.default.Schema.Types.ObjectId, ref: 'Mode' }),
    __metadata("design:type", modes_schema_1.Mode)
], Addon.prototype, "mode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Types.ObjectId, ref: 'Item' }),
    __metadata("design:type", item_schema_1.Item)
], Addon.prototype, "itemId", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        itemName: { type: String },
        description: { type: String },
        price: { type: String },
    })),
    __metadata("design:type", Object)
], Addon.prototype, "addon", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        name: { type: String },
        description: { type: String },
        price: { type: String },
    })),
    __metadata("design:type", Object)
], Addon.prototype, "addon_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ require: true, default: 'false' }),
    __metadata("design:type", Boolean)
], Addon.prototype, "is_deleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ require: true, default: 'true' }),
    __metadata("design:type", Boolean)
], Addon.prototype, "is_activated", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now() }),
    __metadata("design:type", Date)
], Addon.prototype, "created_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now() }),
    __metadata("design:type", Date)
], Addon.prototype, "updated_at", void 0);
exports.Addon = Addon = __decorate([
    (0, mongoose_1.Schema)()
], Addon);
exports.addonSchema = mongoose_1.SchemaFactory.createForClass(Addon);
//# sourceMappingURL=addon.schema.js.map