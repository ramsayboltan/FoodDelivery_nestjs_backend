"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const app_controller_1 = require("./app.controller");
const users_module_1 = require("./users/users.module");
const db_1 = require("../connection/db");
const config_1 = require("@nestjs/config");
const customers_module_1 = require("./customers/customers.module");
const server_configuration_1 = require("../config/server.configuration");
const modes_module_1 = require("./modes/modes.module");
const drivers_module_1 = require("./drivers/drivers.module");
const store_module_1 = require("./store/store.module");
const address_module_1 = require("./address/address.module");
const categories_module_1 = require("./categories/categories.module");
const items_module_1 = require("./items/items.module");
const sub_category_module_1 = require("./sub-category/sub-category.module");
const addon_module_1 = require("./addon/addon.module");
const menu_module_1 = require("./menu/menu.module");
const order_module_1 = require("./order/order.module");
const tag_module_1 = require("./tag/tag.module");
const content_management_module_1 = require("./content_management/content_management.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            modes_module_1.ModesModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [server_configuration_1.default],
                cache: true,
                expandVariables: true,
            }),
            db_1.db1,
            users_module_1.UsersModule,
            customers_module_1.CustomersModule,
            drivers_module_1.DriversModule,
            store_module_1.StoreModule,
            address_module_1.AddressModule,
            categories_module_1.CategoriesModule,
            items_module_1.ItemsModule,
            sub_category_module_1.SubCategoryModule,
            addon_module_1.AddonModule,
            menu_module_1.MenuModule,
            order_module_1.OrderModule,
            tag_module_1.TagModule,
            content_management_module_1.ContentManagementModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, common_1.Logger],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map