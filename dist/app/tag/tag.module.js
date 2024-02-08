"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModule = void 0;
const common_1 = require("@nestjs/common");
const tag_controller_1 = require("./tag.controller");
const tag_service_1 = require("./tag.service");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const tag_schema_1 = require("../../models/tag.schema");
let TagModule = class TagModule {
};
exports.TagModule = TagModule;
exports.TagModule = TagModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: tag_schema_1.Tag.name, schema: tag_schema_1.TagSchema }]),
            jwt_1.JwtModule.register({
                global: true,
                secret: 'qwerty123456',
            }),
        ],
        controllers: [tag_controller_1.TagController],
        providers: [tag_service_1.TagService, common_1.Logger],
        exports: [tag_service_1.TagService],
    })
], TagModule);
//# sourceMappingURL=tag.module.js.map