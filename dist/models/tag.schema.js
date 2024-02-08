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
exports.TagSchema = exports.Tag = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const modes_schema_1 = require("./modes.schema");
let Tag = class Tag {
};
exports.Tag = Tag;
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Mode' }),
    __metadata("design:type", modes_schema_1.Mode)
], Tag.prototype, "mode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tag.prototype, "tagname", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tag.prototype, "tittle", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tag.prototype, "display_name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Tag.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], Tag.prototype, "is_deleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: true }),
    __metadata("design:type", Boolean)
], Tag.prototype, "is_activated", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now() }),
    __metadata("design:type", Date)
], Tag.prototype, "created_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now() }),
    __metadata("design:type", Date)
], Tag.prototype, "updated_at", void 0);
exports.Tag = Tag = __decorate([
    (0, mongoose_1.Schema)()
], Tag);
exports.TagSchema = mongoose_1.SchemaFactory.createForClass(Tag);
//# sourceMappingURL=tag.schema.js.map