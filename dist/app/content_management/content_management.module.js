"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentManagementModule = void 0;
const common_1 = require("@nestjs/common");
const content_management_controller_1 = require("./content_management.controller");
const content_management_service_1 = require("./content_management.service");
const content_management_1 = require("../../models/content_management");
const mongoose_1 = require("@nestjs/mongoose");
let ContentManagementModule = class ContentManagementModule {
};
exports.ContentManagementModule = ContentManagementModule;
exports.ContentManagementModule = ContentManagementModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: content_management_1.ContentManagement.name, schema: content_management_1.ContentManagementSchema }])],
        controllers: [content_management_controller_1.ContentManagementController],
        providers: [content_management_service_1.ContentManagementService],
        exports: [content_management_service_1.ContentManagementService],
    })
], ContentManagementModule);
//# sourceMappingURL=content_management.module.js.map