"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsModule = void 0;
const common_1 = require("@nestjs/common");
const items_controller_1 = require("./items.controller");
const items_service_1 = require("./items.service");
const mongoose_1 = require("@nestjs/mongoose");
const item_schema_1 = require("../../models/item.schema");
const addon_schema_1 = require("../../models/addon.schema");
const addon_module_1 = require("../addon/addon.module");
let ItemsModule = class ItemsModule {
};
exports.ItemsModule = ItemsModule;
exports.ItemsModule = ItemsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            addon_module_1.AddonModule,
            mongoose_1.MongooseModule.forFeature([
                { name: item_schema_1.Item.name, schema: item_schema_1.ItemSchema },
                { name: addon_schema_1.Addon.name, schema: addon_schema_1.addonSchema },
            ]),
        ],
        controllers: [items_controller_1.ItemsController],
        providers: [items_service_1.ItemsService, common_1.Logger],
        exports: [items_service_1.ItemsService],
    })
], ItemsModule);
//# sourceMappingURL=items.module.js.map