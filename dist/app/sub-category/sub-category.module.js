"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const sub_category_controller_1 = require("./sub-category.controller");
const sub_category_service_1 = require("./sub-category.service");
const mongoose_1 = require("@nestjs/mongoose");
const subcategory_Schema_1 = require("../../models/subcategory.Schema");
let SubCategoryModule = class SubCategoryModule {
};
exports.SubCategoryModule = SubCategoryModule;
exports.SubCategoryModule = SubCategoryModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: subcategory_Schema_1.subCategory.name, schema: subcategory_Schema_1.subCategorySchema }])],
        controllers: [sub_category_controller_1.SubCategoryController],
        providers: [sub_category_service_1.SubCategoryService, common_1.Logger],
        exports: [sub_category_service_1.SubCategoryService],
    })
], SubCategoryModule);
//# sourceMappingURL=sub-category.module.js.map