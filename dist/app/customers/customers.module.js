"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersModule = void 0;
const common_1 = require("@nestjs/common");
const customers_controller_1 = require("./customers.controller");
const customers_service_1 = require("./customers.service");
const customer_schema_1 = require("../../models/customer.schema");
const mongoose_1 = require("@nestjs/mongoose");
const users_schema_1 = require("../../models/users.schema");
const address_module_1 = require("../address/address.module");
const address_schema_1 = require("../../models/address.schema");
let CustomersModule = class CustomersModule {
};
exports.CustomersModule = CustomersModule;
exports.CustomersModule = CustomersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            address_module_1.AddressModule,
            mongoose_1.MongooseModule.forFeature([
                { name: customer_schema_1.Customer.name, schema: customer_schema_1.customerSchema },
                { name: users_schema_1.User.name, schema: users_schema_1.UserSchema },
                { name: address_schema_1.Address.name, schema: address_schema_1.addressSchema },
            ]),
        ],
        controllers: [customers_controller_1.CustomersController],
        providers: [customers_service_1.CustomersService],
    })
], CustomersModule);
//# sourceMappingURL=customers.module.js.map